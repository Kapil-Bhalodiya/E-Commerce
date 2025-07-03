def call(Map config) {
    script {
        try {
            echo "📦 Running OWASP Dependency Check..."
            
            // Run OWASP Dependency Check
            dependencyCheck additionalArguments: '''
                --format ALL
                --prettyPrint
                --enableRetired
                --enableExperimental
            ''', odcInstallation: 'OWASP-Dependency-Check'
            
            // Publish dependency check results
            dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            
            // Additional npm audit for Node.js projects (if npm available)
            if (config.servicePath == 'backend' || config.servicePath == 'frontend') {
                dir(config.servicePath) {
                    sh '''
                        if command -v npm &> /dev/null; then
                            echo "Running npm audit..."
                            npm audit --audit-level=moderate > ../reports/npm-audit.txt 2>&1 || echo "npm audit completed with warnings"
                            
                            # Simple vulnerability check without jq
                            if npm audit --audit-level=critical 2>&1 | grep -q "found.*critical"; then
                                echo "⚠️ Critical vulnerabilities found in dependencies"
                            else
                                echo "✅ No critical vulnerabilities found"
                            fi
                        else
                            echo "⚠️ npm not found, skipping npm audit"
                            echo "Install Node.js in Jenkins agent for npm audit" > ../reports/npm-audit.txt
                        fi
                    '''
                }
            }
            
            echo "✅ Dependency check completed successfully"
            
        } catch (Exception e) {
            echo "⚠️ Dependency check failed: ${e.getMessage()}"
            currentBuild.result = 'UNSTABLE'
        }
    }
}