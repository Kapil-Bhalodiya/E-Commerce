def call(Map config) {
    pipeline {
        agent any
        
        environment {
            IMAGE_TAG = "${BUILD_NUMBER}-latest"
        }
        
        options {
            timeout(time: 20, unit: 'MINUTES')
            buildDiscarder(logRotator(numToKeepStr: '5'))
        }
        
        stages {
            stage('Setup') {
                steps {
                    checkoutCode(config.gitConfig)
                    installTools()
                }
            }
            
            stage('Quality & Security') {
                parallel {
                    stage('Code Quality') { steps { runSonarQube(config) } }
                    stage('Security Scan') { steps { runTrivy(config.servicePath) } }
                    stage('Dependencies') { steps { runDependencyCheck() } }
                }
            }
            
            stage('Test & Lint') {
                steps {
                    runTests(config.servicePath)
                    runLint(config.servicePath)
                }
            }
            
            stage('Build & Deploy') {
                steps {
                    buildDocker(config.servicePath, config.imageName, env.IMAGE_TAG)
                    pushDocker(config.imageName, env.IMAGE_TAG, config.registryCredentials)
                    updateK8sManifest(config.helmPath, env.IMAGE_TAG)
                    script {
                        sh 'rm -f dependency-check-*.* || true'
                    }
                    commitManifestChanges(config.serviceName, env.IMAGE_TAG, config.gitConfig.credentialsId)
                }
            }
        }
        
        post {
            always { 
                sendNotification(currentBuild.result ?: 'SUCCESS', config)
            }
        }
    }
}