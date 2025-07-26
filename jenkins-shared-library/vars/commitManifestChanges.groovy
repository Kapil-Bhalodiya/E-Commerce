def call(String serviceName, String imageTag, String credentialsId) {
    withCredentials([usernamePassword(credentialsId: credentialsId, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
        sh """
            git config --global user.email "ci@example.com"
            git config --global user.name "CI Bot"
            git config --global pull.rebase false 

            git stash || echo "Nothing to stash"
            git checkout main || echo "Already on main"
            git pull origin main
            git stash pop || echo "Nothing to pop"

            git add .
            git commit -m "Update ${serviceName} image to ${imageTag}" || echo "No changes to commit"

            git push https://\${GIT_USER}:\${GIT_TOKEN}@github.com/Kapil-Bhalodiya/E-commerce.git main
        """
    }
}