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
        }



        stages {
            stage('Checkout') {
                steps {
                    checkoutCode(config.gitConfig)
                }
            }

            stage('Build Docker Image') {
                steps {
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

                        env.IMAGE_TAG = "${env.BUILD_NUMBER}-${gitCommit}"
                        buildDocker(SERVICE_PATH, IMAGE_NAME, env.IMAGE_TAG)
                    }
                }
            }

            stage('Push Docker Image') {
                steps {
                    pushDocker(IMAGE_NAME, env.IMAGE_TAG, REGISTRY_CREDENTIALS)
                }
            }

            stage('Update Kubernetes manifests') {
                steps {
                    updateK8sManifest(config.helmPath, env.IMAGE_TAG)
                }
            }

            stage('Git Commit Manifest Changes') {
                steps {
                    commitManifestChanges(config.serviceName, env.IMAGE_TAG, config.gitConfig.credentialsId)
                }
            }


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