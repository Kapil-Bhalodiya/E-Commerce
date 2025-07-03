def call(Map config) {
    script {
        try {
            echo "🔒 Running Trivy Security Scanning..."
            
            // Trivy should be installed in setup stage
            sh 'mkdir -p reports'
            
            // Scan filesystem for vulnerabilities
            sh """
                echo "Scanning filesystem for vulnerabilities..."
                trivy fs --format json --output reports/trivy-fs-report.json ${config.servicePath}/
                trivy fs --format table --output reports/trivy-fs-report.txt ${config.servicePath}/
                
                echo "Scanning for secrets..."
                trivy fs --scanners secret --format json --output reports/trivy-secrets-report.json ${config.servicePath}/
                trivy fs --scanners secret --format table --output reports/trivy-secrets-report.txt ${config.servicePath}/
                
                echo "Scanning for misconfigurations..."
                trivy fs --scanners config --format json --output reports/trivy-config-report.json ${config.servicePath}/
                trivy fs --scanners config --format table --output reports/trivy-config-report.txt ${config.servicePath}/
            """
            
            // Check for critical vulnerabilities
            def criticalVulns = sh(
                script: "trivy fs --format json ${config.servicePath}/ | jq '.Results[]?.Vulnerabilities[]? | select(.Severity == \"CRITICAL\") | length' | wc -l",
                returnStdout: true
            ).trim()
            
            if (criticalVulns.toInteger() > 0) {
                echo "⚠️ Found ${criticalVulns} critical vulnerabilities"
                currentBuild.result = 'UNSTABLE'
            }
            
            echo "✅ Trivy security scanning completed"
            
        } catch (Exception e) {
            echo "❌ Security scanning failed: ${e.getMessage()}"
            throw e
        }
    }
}