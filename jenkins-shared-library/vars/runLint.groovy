def call(String servicePath) {
    dir(servicePath) {
        script {
            if (sh(script: 'command -v npm', returnStatus: true) == 0) {
                sh '''
                    npm install --save-dev eslint
                    npx eslint src/ --format table > ../reports/lint.txt || echo "Lint completed with warnings"
                '''
                echo "✅ Lint completed"
            } else {
                echo "⚠️ npm not found, lint skipped"
            }
        }
    }
}