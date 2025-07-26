def call(String serviceName, String imageTag, String credentialsId) {
    withCredentials([usernamePassword(credentialsId: credentialsId, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
        sh """
            git config --global user.email "ci@example.com"
            git config --global user.name "CI Bot"
<<<<<<< HEAD
            git config --global pull.rebase false 

            git checkout main || echo "Already on main"
            git pull origin main

            git add .
            git commit -m "Update ${serviceName} image to ${imageTag}" || echo "No changes to commit"

            git push https://\${GIT_USER}:\${GIT_TOKEN}@github.com/Kapil-Bhalodiya/E-commerce-Platform.git main
=======
            git config --global pull.rebase false

            # Stash any local changes
            git stash || echo "Nothing to stash"

            # Ensure we're on the main branch
            git checkout main || echo "Already on main"

            # Attempt to pull with allow-unrelated-histories as a fallback
            git pull origin main || git pull origin main --allow-unrelated-histories || echo "Failed to pull, proceeding with local changes"

            # Pop stashed changes if any
            git stash pop || echo "Nothing to pop"

            # Add all changes
            git add .

            # Commit changes, ignoring if nothing to commit
            git commit -m "Update ${serviceName} image to ${imageTag}" || echo "No changes to commit"

            # Push to remote
            git push https://${GIT_USER}:${GIT_TOKEN}@github.com/Kapil-Bhalodiya/E-commerce.git main || echo "Push failed"
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
        """
    }
}