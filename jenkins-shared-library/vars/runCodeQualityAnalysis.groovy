def call(Map config) {
    script {
        try {
            echo "🔍 Running SonarQube Code Quality Analysis..."
            
            // Create reports directory
            sh 'mkdir -p reports'
            
            def scannerHome = tool 'SonarQubeScanner'
            
            withSonarQubeEnv('SonarQube') {
                if (config.servicePath == 'backend') {
                    // Node.js backend analysis
                    sh """
                        cd ${config.servicePath}
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${config.sonarProjectKey} \
                            -Dsonar.projectName="${config.serviceName}" \
                            -Dsonar.projectVersion=${env.BUILD_NUMBER} \
                            -Dsonar.sources=src \
                            -Dsonar.exclusions=node_modules/**,coverage/**,dist/** \
                            -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info \
                            -Dsonar.testExecutionReportPaths=test-results.xml
                    """
                } else if (config.servicePath == 'frontend') {
                    // Angular frontend analysis
                    sh """
                        cd ${config.servicePath}
                        ${scannerHome}/bin/sonar-scanner \
                            -Dsonar.projectKey=${config.sonarProjectKey} \
                            -Dsonar.projectName="${config.serviceName}" \
                            -Dsonar.projectVersion=${env.BUILD_NUMBER} \
                            -Dsonar.sources=src \
                            -Dsonar.exclusions=node_modules/**,dist/**,coverage/**,*.spec.ts \
                            -Dsonar.typescript.lcov.reportPaths=coverage/lcov.info \
                            -Dsonar.testExecutionReportPaths=test-results.xml
                    """
                }
            }
            
            // Wait for quality gate
            timeout(time: 5, unit: 'MINUTES') {
                def qg = waitForQualityGate()
                if (qg.status != 'OK') {
                    error "Pipeline aborted due to quality gate failure: ${qg.status}"
                }
            }
            
            echo "✅ SonarQube analysis completed successfully"
            
        } catch (Exception e) {
            echo "❌ SonarQube analysis failed: ${e.getMessage()}"
            throw e
        }
    }
}