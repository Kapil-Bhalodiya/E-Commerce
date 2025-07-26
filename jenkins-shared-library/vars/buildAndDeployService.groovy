def call(Map config) {
    pipeline {
        agent any

        environment {
            IMAGE_NAME = "${config.imageName}"
<<<<<<< HEAD
            IMAGE_TAG = "${env.BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
            REGISTRY_CREDENTIALS = "${config.registryCredentials ?: 'Dockerhub-creds'}"
            K8S_NAMESPACE = "${config.namespace ?: 'dev'}"
            HELM_RELEASE = "${config.helmRelease}"
            SERVICE_PATH = "${config.servicePath}"
            CHANGESET_PATTERN = "${config.changesetPattern}"
        }

<<<<<<< HEAD
        triggers {
            pollSCM('H/5 * * * *')
        }
=======

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

        stages {
            stage('Checkout') {
                steps {
                    checkoutCode(config.gitConfig)
                }
            }

            stage('Build Docker Image') {
                steps {
<<<<<<< HEAD
                    buildDocker(SERVICE_PATH, IMAGE_NAME, IMAGE_TAG)
=======
                    script {
                        def gitCommit = ""
                        try {
                            gitCommit = sh(script: "git rev-parse --short HEAD", returnStdout: true).trim()
                            if (!gitCommit) {
                                error("GIT_COMMIT is empty.")
                            }
                        } catch (Exception e) {
                            // fallback to previous build tag if commit hash isn't available
                            echo "⚠️ Warning: Could not determine git commit. Falling back to latest image tag."
                            gitCommit = "latest"
                        }

                        env.IMAGE_TAG = gitCommit ? "${env.BUILD_NUMBER}-${gitCommit}" : "${env.BUILD_NUMBER}-latest"
                        buildDocker(SERVICE_PATH, IMAGE_NAME, env.IMAGE_TAG)
                    }
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
                }
            }

            stage('Push Docker Image') {
                steps {
<<<<<<< HEAD
                    pushDocker(IMAGE_NAME, IMAGE_TAG, REGISTRY_CREDENTIALS)
=======
                    pushDocker(IMAGE_NAME, env.IMAGE_TAG, REGISTRY_CREDENTIALS)
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
                }
            }

            stage('Update Kubernetes manifests') {
                steps {
<<<<<<< HEAD
                    updateK8sManifest(config.helmPath, IMAGE_TAG)
=======
                    updateK8sManifest(config.helmPath, env.IMAGE_TAG)
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
                }
            }

            stage('Git Commit Manifest Changes') {
                steps {
<<<<<<< HEAD
                    commitManifestChanges(config.serviceName, IMAGE_TAG, config.gitConfig.credentialsId)
                }
            }
=======
                    commitManifestChanges(config.serviceName, env.IMAGE_TAG, config.gitConfig.credentialsId)
                }
            }


>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
        }

        post {
            success {
                echo "✅ ${config.serviceName} Deployment completed successfully."
            }
            failure {
                echo "❌ ${config.serviceName} Deployment failed. Check Jenkins logs for details."
            }
        }
    }
}