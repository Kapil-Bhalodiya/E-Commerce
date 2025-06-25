def call(String path, String imageName, String tag) {
    dir(path) {
        echo "🛠️ Building Docker image: ${imageName}:${tag}"
        sh """
            docker build \
                --build-arg BUILD_DATE=\$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
                --build-arg VCS_REF=${env.GIT_COMMIT} \
                --build-arg VERSION=${tag} \
                -t ${imageName}:${tag} .
        """
        echo "✅ Docker image built successfully"
    }
}
