def call() {
    script {
        try {
            echo "🔧 Installing Security Tools..."
            
            sh '''
                # Install Trivy
                if ! command -v trivy &> /dev/null; then
                    echo "Installing Trivy..."
                    curl -sfL https://raw.githubusercontent.com/aquasecurity/trivy/main/contrib/install.sh | sh -s -- -b /usr/local/bin
                fi
                
                # Install Hadolint
                if ! command -v hadolint &> /dev/null; then
                    echo "Installing Hadolint..."
                    curl -sL -o /usr/local/bin/hadolint https://github.com/hadolint/hadolint/releases/latest/download/hadolint-Linux-x86_64
                    chmod +x /usr/local/bin/hadolint
                fi
                
                # Verify installations
                trivy --version
                hadolint --version
            '''
            
            echo "✅ Security tools installed successfully"
            
        } catch (Exception e) {
            echo "❌ Security tools installation failed: ${e.getMessage()}"
            throw e
        }
    }
}