def call(Map config) {
    script {
        try {
            echo "🔒 Running Trivy Security Scanning..."
            
            // Install Trivy if not available
            sh '''
                if ! command -v trivy &> /dev/null; then
                    echo "Installing Trivy..."
                    wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
                    echo "deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
                    sudo apt-get update
                    sudo apt-get install trivy
                fi
            '''
            
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