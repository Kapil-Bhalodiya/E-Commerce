def call() {
    sh '''
        # Install Trivy
        if ! command -v trivy &> /dev/null; then
            curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
        fi
        
        echo "✅ Tools ready"
    '''
}