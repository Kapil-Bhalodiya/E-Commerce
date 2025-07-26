def call(String serviceName, String imageTag, String credentialsId) {
    withCredentials([usernamePassword(credentialsId: credentialsId, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
        sh """
            git config --global user.email "ci@example.com"
            git config --global user.name "CI Bot"
            git config --global pull.rebase true

            # Clean checkout main
            git fetch origin main
            git checkout main
            git reset --hard origin/main

            # Apply changes
            git add .
            git diff --cached --quiet || git commit -m "Update ${serviceName} image to ${imageTag}"

            # Push using token
            git push https://${GIT_USER}:${GIT_TOKEN}@github.com/Kapil-Bhalodiya/E-commerce.git main
        """
    }
}