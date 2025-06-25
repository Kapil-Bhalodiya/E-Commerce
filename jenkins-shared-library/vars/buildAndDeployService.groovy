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
            pollSCM('H/2 * * * *')
        }

        stages {
            stage('Checkout') {
                steps {
                    checkoutCode(config.gitConfig)
                }
            }

            stage("Detect Changes in ${config.serviceName}") {
                when {
                    changeset "${CHANGESET_PATTERN}"
                }
                steps {
                    echo "Changes detected in ${config.serviceName} folder. Proceeding with build.."
                }
            }

            stage('Build Docker Image') {
                when {
                    changeset "${CHANGESET_PATTERN}"
                }
                steps {
                    buildDocker(SERVICE_PATH, IMAGE_NAME, IMAGE_TAG)
                }
            }

            stage('Push Docker Image') {
                when {
                    changeset "${CHANGESET_PATTERN}"
                }
                steps {
                    pushDocker(IMAGE_NAME, IMAGE_TAG, REGISTRY_CREDENTIALS)
                }
            }

            stage("Update Kubernetes manifests") {
                when {
                    changeset "${CHANGESET_PATTERN}"
                }
                steps {
                    updateK8sManifest(config.helmPath, IMAGE_TAG)
                }
            }

            stage("Git Commit Manifest Changes") {
                when {
                    changeset "${CHANGESET_PATTERN}"
                }
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