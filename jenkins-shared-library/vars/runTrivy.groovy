def call(String servicePath) {
    sh """
        # Filesystem scan (no file output)
        trivy fs --format table ${servicePath}/ || true
        
        # Check for critical issues
        if trivy fs --format json ${servicePath}/ | grep -q '"Severity":"CRITICAL"'; then
            echo "⚠️ Critical vulnerabilities found"
        fi
        
        echo "✅ Security scan completed"
    """
}