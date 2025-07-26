def call(String serviceName, String imageTag, String credentialsId) {
    withCredentials([usernamePassword(credentialsId: credentialsId, usernameVariable: 'GIT_USER', passwordVariable: 'GIT_TOKEN')]) {
        sh """
            echo 🔧 Git config
            git config --global user.email "ci@example.com"
            git config --global user.name "CI Bot"
            git config --global pull.rebase true

            echo 🔄 Fetch & reset to origin/main
            git fetch origin main
            git checkout main
            git reset --hard origin/main

            echo 🛠️ Updating values.yaml
            sed -i -E 's|^(\\s*tag:) .*|\\1 "${imageTag}"|' infra/addons/frontend/values.yaml || echo "❌ Tag not found"

            echo 📂 Preview change
            grep -A 2 -B 2 tag: infra/addons/frontend/values.yaml

            echo 💾 Commit if changes exist
            git add infra/addons/frontend/values.yaml
            git diff --cached --quiet || git commit -m "Update ${serviceName} image to ${imageTag}"

            echo 🚀 Push to remote
            git push https://\$GIT_USER:\$GIT_TOKEN@github.com/Kapil-Bhalodiya/E-commerce.git main
        """
    }
}
