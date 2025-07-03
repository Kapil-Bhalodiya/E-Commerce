def call(Map config) {
    script {
        try {
            echo "🔍 Running SonarQube Code Quality Analysis..."
            
            // Create reports directory
            sh 'mkdir -p reports'
            
            // Check if SonarQube is configured
            def sonarConfigured = false
            try {
                def scannerHome = tool 'SonarQubeScanner'
                sonarConfigured = true
            } catch (Exception e) {
                echo "⚠️ SonarQube Scanner not configured, skipping analysis"
                return
            }
            
            if (sonarConfigured) {
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
                                -Dsonar.exclusions=node_modules/**,coverage/**,dist/**
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
                                -Dsonar.exclusions=node_modules/**,dist/**,coverage/**,*.spec.ts
                        """
                    }
                }
                
                // Wait for quality gate (optional)
                try {
                    timeout(time: 2, unit: 'MINUTES') {
                        def qg = waitForQualityGate()
                        if (qg.status != 'OK') {
                            echo "⚠️ Quality gate failed: ${qg.status}"
                            currentBuild.result = 'UNSTABLE'
                        }
                    }
                } catch (Exception e) {
                    echo "⚠️ Quality gate check failed: ${e.getMessage()}"
                    currentBuild.result = 'UNSTABLE'
                }
            }
            
            echo "✅ SonarQube analysis completed"
            
        } catch (Exception e) {
            echo "⚠️ SonarQube analysis failed: ${e.getMessage()}"
            currentBuild.result = 'UNSTABLE'
        }
    }
}