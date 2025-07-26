def call(String serviceName, String imageTag, String credentialsId) {
    withCredentials([usernamePassword(credentialsId: credentialsId, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
            sh """
                echo 🔧 Setting Git config
                git config --global user.email "ci@example.com"
                git config --global user.name "CI Bot"
                git config --global pull.rebase true

                echo 🔄 Fetching and resetting to origin/main
                git fetch origin main
                git checkout main
                git reset --hard origin/main

                echo 🛠️ Updating image tag in values.yaml
                sed -i -E 's|^(\\s*tag:) .*|\\1 "${imageTag}"|' values.yaml || echo "❌ Tag not found"

                echo 📂 Previewing updated tag
                grep -A 2 -B 2 tag: values.yaml

                echo 💾 Committing changes if any
                git add values.yaml
                git diff --cached --quiet || git commit -m "Update ${serviceName} image to ${imageTag}"

                echo 🚀 Pushing to main
                git push https://${GIT_USER}:${GIT_TOKEN}@github.com/Kapil-Bhalodiya/E-commerce.git main
            """
        }
}