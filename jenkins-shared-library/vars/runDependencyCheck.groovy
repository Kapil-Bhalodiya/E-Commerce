def call() {
    script {
        try {
            dependencyCheck additionalArguments: '--format NONE', odcInstallation: 'OWASP-Dependency-Check'
            echo "✅ Dependency check completed"
        } catch (Exception e) {
            echo "⚠️ Dependency check skipped: ${e.message}"
            currentBuild.result = 'UNSTABLE'
        }
    }
}