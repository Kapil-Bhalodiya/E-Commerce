def call(String imageName, String imageTag) {
    script {
        try {
            echo "🐳 Running Container Security Scan..."
            
            // Scan Docker image with Trivy
            sh """
                echo "Scanning Docker image for vulnerabilities..."
                trivy image --format json --output reports/trivy-image-report.json ${imageName}:${imageTag}
                trivy image --format table --output reports/trivy-image-report.txt ${imageName}:${imageTag}
                
                echo "Scanning Docker image for secrets..."
                trivy image --scanners secret --format json --output reports/trivy-image-secrets.json ${imageName}:${imageTag}
                trivy image --scanners secret --format table --output reports/trivy-image-secrets.txt ${imageName}:${imageTag}
            """
            
            // Docker Bench Security (if available)
            sh '''
                if command -v docker-bench-security &> /dev/null; then
                    echo "Running Docker Bench Security..."
                    docker run --rm --net host --pid host --userns host --cap-add audit_control \
                        -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \
                        -v /etc:/etc:ro \
                        -v /usr/bin/containerd:/usr/bin/containerd:ro \
                        -v /usr/bin/runc:/usr/bin/runc:ro \
                        -v /usr/lib/systemd:/usr/lib/systemd:ro \
                        -v /var/lib:/var/lib:ro \
                        -v /var/run/docker.sock:/var/run/docker.sock:ro \
                        --label docker_bench_security \
                        docker/docker-bench-security > reports/docker-bench-security.txt || true
                fi
            '''
            
            // Check for critical vulnerabilities in container
            def criticalVulns = sh(
                script: "trivy image --format json ${imageName}:${imageTag} | jq '.Results[]?.Vulnerabilities[]? | select(.Severity == \"CRITICAL\") | length' | wc -l",
                returnStdout: true
            ).trim()
            
            if (criticalVulns.toInteger() > 0) {
                echo "⚠️ Found ${criticalVulns} critical vulnerabilities in container image"
                currentBuild.result = 'UNSTABLE'
            }
            
            // Hadolint for Dockerfile linting
            sh '''
                echo "Running Hadolint for Dockerfile..."
                find . -name "Dockerfile*" -exec hadolint {} \\; > reports/hadolint-report.txt || true
            '''
            
            echo "✅ Container security scan completed"
            
        } catch (Exception e) {
            echo "❌ Container security scan failed: ${e.getMessage()}"
            throw e
        }
    }
}