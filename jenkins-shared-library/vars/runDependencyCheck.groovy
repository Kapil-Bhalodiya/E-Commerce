def call() {
    script {
        try {
            dependencyCheck additionalArguments: '--format ALL', odcInstallation: 'OWASP-Dependency-Check'
            dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            echo "✅ Dependency check completed"
        } catch (Exception e) {
            echo "⚠️ Dependency check skipped: ${e.message}"
            currentBuild.result = 'UNSTABLE'
        }
    }
}