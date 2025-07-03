def call() {
    try {
        archiveArtifacts artifacts: 'reports/**/*', allowEmptyArchive: true
        publishHTML([
            allowMissing: true,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports',
            reportFiles: '*.html,*.txt',
            reportName: 'Pipeline Reports'
        ])
        echo "✅ Reports published"
    } catch (Exception e) {
        echo "⚠️ Report publishing failed: ${e.message}"
    }
}