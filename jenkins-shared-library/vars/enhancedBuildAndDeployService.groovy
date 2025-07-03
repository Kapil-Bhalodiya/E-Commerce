def call(Map config) {
    pipeline {
        agent any

        environment {
            IMAGE_NAME = "${config.imageName}"
            REGISTRY_CREDENTIALS = "${config.registryCredentials ?: 'Dockerhub-creds'}"
            K8S_NAMESPACE = "${config.namespace ?: 'dev'}"
            HELM_RELEASE = "${config.helmRelease}"
            SERVICE_PATH = "${config.servicePath}"
            CHANGESET_PATTERN = "${config.changesetPattern}"
            SONAR_PROJECT_KEY = "${config.sonarProjectKey}"
            SLACK_CHANNEL = "${config.slackChannel ?: '#ci-cd'}"
            EMAIL_RECIPIENTS = "${config.emailRecipients ?: 'devops@company.com'}"
        }

        options {
            buildDiscarder(logRotator(numToKeepStr: '10'))
            timeout(time: 30, unit: 'MINUTES')
            parallelsAlwaysFailFast()
        }

        stages {
            stage('Checkout & Setup') {
                steps {
                    checkoutCode(config.gitConfig)
                    installSecurityTools()
                    script {
                        env.GIT_COMMIT = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                        env.IMAGE_TAG = "${env.BUILD_NUMBER}-${env.GIT_COMMIT}"
                        env.BUILD_TIMESTAMP = sh(script: "date +%Y%m%d-%H%M%S", returnStdout: true).trim()
                    }
                }
            }

            stage('Parallel Quality & Security Checks') {
                parallel {
                    stage('Code Quality Analysis') {
                        steps {
                            runCodeQualityAnalysis(config)
                        }
                    }
                    stage('Security Scanning') {
                        steps {
                            runSecurityScanning(config)
                        }
                    }
                    stage('Dependency Check') {
                        steps {
                            runDependencyCheck(config)
                        }
                    }
                }
            }

            stage('Testing') {
                parallel {
                    stage('Unit Tests') {
                        steps {
                            runUnitTests(config)
                        }
                        post {
                            always {
                                publishTestResults testResultsPattern: '**/test-results.xml'
                                publishCoverage adapters: [
                                    jacocoAdapter('**/coverage.xml')
                                ], sourceFileResolver: sourceFiles('STORE_LAST_BUILD')
                            }
                        }
                    }
                    stage('Lint Check') {
                        steps {
                            runLintCheck(config)
                        }
                    }
                }
            }

            stage('Build & Package') {
                steps {
                    buildDocker(SERVICE_PATH, IMAGE_NAME, env.IMAGE_TAG)
                }
            }

            stage('Container Security Scan') {
                steps {
                    runContainerSecurityScan(IMAGE_NAME, env.IMAGE_TAG)
                }
            }

            stage('Push Artifacts') {
                steps {
                    pushDocker(IMAGE_NAME, env.IMAGE_TAG, REGISTRY_CREDENTIALS)
                }
            }

            stage('Deploy to Dev') {
                steps {
                    updateK8sManifest(config.helmPath, env.IMAGE_TAG)
                    commitManifestChanges(config.serviceName, env.IMAGE_TAG, config.gitConfig.credentialsId)
                }
            }

            stage('Post-Deploy Tests') {
                steps {
                    runPostDeployTests(config)
                }
            }
        }

        post {
            always {
                publishHTML([
                    allowMissing: false,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'reports',
                    reportFiles: '*.html',
                    reportName: 'Security & Quality Report'
                ])
                archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
            }
            success {
                sendNotification('SUCCESS', config)
            }
            failure {
                sendNotification('FAILURE', config)
            }
            unstable {
                sendNotification('UNSTABLE', config)
            }
        }
    }
}