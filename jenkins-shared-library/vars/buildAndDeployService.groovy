def call(Map config) {
    pipeline {
        agent any

        environment {
            IMAGE_NAME = "${config.imageName}"
            IMAGE_TAG = "${env.BUILD_NUMBER}-${GIT_COMMIT.take(7)}"
            REGISTRY_CREDENTIALS = "${config.registryCredentials ?: 'Dockerhub-creds'}"
            K8S_NAMESPACE = "${config.namespace ?: 'dev'}"
            HELM_RELEASE = "${config.helmRelease}"
            SERVICE_PATH = "${config.servicePath}"
            CHANGESET_PATTERN = "${config.changesetPattern}"
        }

        triggers {
            pollSCM('H/5 * * * *')
        }

        stages {
            stage('Checkout') {
                steps {
                    checkoutCode(config.gitConfig)
                }
            }

            stage('Build Docker Image') {
                steps {
                    buildDocker(SERVICE_PATH, IMAGE_NAME, IMAGE_TAG)
                }
            }

            stage('Push Docker Image') {
                steps {
                    pushDocker(IMAGE_NAME, IMAGE_TAG, REGISTRY_CREDENTIALS)
                }
            }

            stage('Update Kubernetes manifests') {
                steps {
                    updateK8sManifest(config.helmPath, IMAGE_TAG)
                }
            }

            stage('Git Commit Manifest Changes') {
                steps {
                    commitManifestChanges(config.serviceName, IMAGE_TAG, config.gitConfig.credentialsId)
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