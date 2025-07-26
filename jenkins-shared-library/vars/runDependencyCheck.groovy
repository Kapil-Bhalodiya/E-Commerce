def call() {
    script {
        try {
            dependencyCheck additionalArguments: '--format XML --out /tmp', odcInstallation: 'OWASP-Dependency-Check'
            echo "✅ Dependency check completed"
        } catch (Exception e) {
            echo "⚠️ Dependency check skipped: ${e.message}"
            currentBuild.result = 'UNSTABLE'
        }
    }
}