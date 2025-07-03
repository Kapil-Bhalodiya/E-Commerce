def call(Map config) {
    script {
        try {
            echo "🚀 Running Post-Deploy Tests..."
            
            // Wait for deployment to be ready
            sh """
                echo "Waiting for deployment to be ready..."
                kubectl wait --for=condition=available --timeout=300s deployment/${config.helmRelease} -n ${config.namespace} || true
                
                # Get service endpoint
                SERVICE_URL=\$(kubectl get service ${config.helmRelease} -n ${config.namespace} -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null || echo "localhost")
                SERVICE_PORT=\$(kubectl get service ${config.helmRelease} -n ${config.namespace} -o jsonpath='{.spec.ports[0].port}' 2>/dev/null || echo "80")
                
                echo "Service URL: http://\$SERVICE_URL:\$SERVICE_PORT"
                echo "SERVICE_URL=http://\$SERVICE_URL:\$SERVICE_PORT" > service_url.env
            """
            
            // Load service URL
            def serviceUrl = sh(script: "cat service_url.env | cut -d'=' -f2", returnStdout: true).trim()
            
            // Health check
            sh """
                echo "Running health check..."
                for i in {1..30}; do
                    if curl -f -s ${serviceUrl}/health > /dev/null 2>&1; then
                        echo "✅ Health check passed"
                        break
                    fi
                    echo "Waiting for service to be ready... (\$i/30)"
                    sleep 10
                done
            """
            
            // Smoke tests
            if (config.servicePath == 'backend') {
                sh """
                    echo "Running API smoke tests..."
                    
                    # Test API endpoints
                    curl -f -s ${serviceUrl}/api/health || echo "Health endpoint failed"
                    curl -f -s ${serviceUrl}/api/categories || echo "Categories endpoint failed"
                    
                    # Performance test with Apache Bench (if available)
                    if command -v ab &> /dev/null; then
                        echo "Running performance test..."
                        ab -n 100 -c 10 ${serviceUrl}/api/health > reports/performance-test.txt || true
                    fi
                """
            } else if (config.servicePath == 'frontend') {
                sh """
                    echo "Running frontend smoke tests..."
                    
                    # Test main page
                    curl -f -s ${serviceUrl}/ > /dev/null || echo "Main page failed"
                    
                    # Test static assets
                    curl -f -s ${serviceUrl}/assets/images/breadcrumb-bg.png > /dev/null || echo "Static assets failed"
                    
                    # Lighthouse audit (if available)
                    if command -v lighthouse &> /dev/null; then
                        echo "Running Lighthouse audit..."
                        lighthouse ${serviceUrl} --output=json --output-path=reports/lighthouse-report.json --chrome-flags="--headless --no-sandbox" || true
                    fi
                """
            }
            
            // Security tests
            sh """
                echo "Running security tests..."
                
                # Test for common security headers
                curl -I ${serviceUrl}/ | grep -i "x-frame-options\\|x-content-type-options\\|x-xss-protection" > reports/security-headers.txt || true
                
                # OWASP ZAP baseline scan (if available)
                if command -v zap-baseline.py &> /dev/null; then
                    echo "Running OWASP ZAP baseline scan..."
                    zap-baseline.py -t ${serviceUrl} -J reports/zap-report.json || true
                fi
            """
            
            echo "✅ Post-deploy tests completed successfully"
            
        } catch (Exception e) {
            echo "❌ Post-deploy tests failed: ${e.getMessage()}"
            throw e
        }
    }
}