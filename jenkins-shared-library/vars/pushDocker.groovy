def call(String imageName, String tag, String registryCredsId) {
    withCredentials([usernamePassword(credentialsId: registryCredsId, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
        echo "🚀 Pushing Docker image: ${imageName}:${tag}"
        sh """
            echo \$PASS | docker login -u \$USER --password-stdin
            docker push ${imageName}:${tag}
            docker push ${imageName}:latest
        """
        echo "✅ Docker image pushed successfully"
    }
}
