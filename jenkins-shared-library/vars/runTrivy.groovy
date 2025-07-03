def call(String servicePath) {
    sh """
        # Filesystem scan
        trivy fs --format table --output reports/trivy-fs.txt ${servicePath}/ || true
        
        # Check for critical issues
        if trivy fs --format json ${servicePath}/ | grep -q '"Severity":"CRITICAL"'; then
            echo "⚠️ Critical vulnerabilities found"
        fi
        
        echo "✅ Security scan completed"
    """
}