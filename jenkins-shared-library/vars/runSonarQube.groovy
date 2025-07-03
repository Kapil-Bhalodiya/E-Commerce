def call(Map config) {
    script {
        try {
            def scannerHome = tool 'SonarQubeScanner'
            withSonarQubeEnv('SonarQube') {
                dir(config.servicePath) {
                    sh """
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${config.sonarProjectKey} \
                            -Dsonar.projectName="${config.serviceName}" \
                            -Dsonar.sources=src \
                            -Dsonar.exclusions=node_modules/**,dist/**,coverage/**
                    """
                }
            }
            echo "✅ SonarQube completed"
        } catch (Exception e) {
            echo "⚠️ SonarQube skipped: ${e.message}"
            currentBuild.result = 'UNSTABLE'
        }
    }
}