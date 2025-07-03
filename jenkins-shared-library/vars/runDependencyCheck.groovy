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
            
            // Additional npm/yarn audit for Node.js projects
            if (config.servicePath == 'backend' || config.servicePath == 'frontend') {
                dir(config.servicePath) {
                    sh '''
                        echo "Running npm audit..."
                        npm audit --audit-level=moderate --json > ../reports/npm-audit.json || true
                        npm audit --audit-level=moderate > ../reports/npm-audit.txt || true
                        
                        # Check for high/critical vulnerabilities
                        HIGH_VULNS=$(npm audit --audit-level=high --json | jq '.metadata.vulnerabilities.high // 0')
                        CRITICAL_VULNS=$(npm audit --audit-level=critical --json | jq '.metadata.vulnerabilities.critical // 0')
                        
                        echo "High vulnerabilities: $HIGH_VULNS"
                        echo "Critical vulnerabilities: $CRITICAL_VULNS"
                        
                        if [ "$CRITICAL_VULNS" -gt "0" ]; then
                            echo "❌ Critical vulnerabilities found in dependencies"
                            exit 1
                        fi
                        
                        if [ "$HIGH_VULNS" -gt "5" ]; then
                            echo "⚠️ Too many high vulnerabilities found"
                            exit 1
                        fi
                    '''
                }
            }
            
            echo "✅ Dependency check completed successfully"
            
        } catch (Exception e) {
            echo "❌ Dependency check failed: ${e.getMessage()}"
            throw e
        }
    }
}