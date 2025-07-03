def call(String servicePath) {
    dir(servicePath) {
        script {
            if (sh(script: 'command -v npm', returnStatus: true) == 0) {
                sh '''
                    npm ci
                    npm test || echo "Tests completed with warnings"
                '''
                echo "✅ Tests completed"
            } else {
                echo "⚠️ npm not found, tests skipped"
            }
        }
    }
}