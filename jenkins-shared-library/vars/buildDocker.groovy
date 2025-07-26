def call(String path, String imageName, String tag) {
    dir(path) {
        echo "🛠️ Building Docker image: ${imageName}:${tag}"
        sh """
<<<<<<< HEAD
            docker build \
                --build-arg BUILD_DATE=\$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
                --build-arg VCS_REF=${env.GIT_COMMIT} \
                --build-arg VERSION=${tag} \
                -t ${imageName}:${tag} .
        """
        echo "✅ Docker image built successfully"
    }
}
=======
            # Configure DNS for Docker build
            export DOCKER_BUILDKIT=0

            for i in \$(seq 1 3); do
                echo "Build attempt \$i..."
                if docker build \
                    --network=host \
                    --build-arg BUILD_DATE=\$(date -u +'%Y-%m-%dT%H:%M:%SZ') \
                    --build-arg VCS_REF=${env.GIT_COMMIT ?: 'latest'} \
                    --build-arg VERSION=${tag} \
                    -t ${imageName}:${tag} .; then
                    echo "Build successful"
                    break
                else
                    echo "Build failed, retrying..."
                    if [ \$i -eq 3 ]; then
                        echo "All attempts failed"
                        exit 1
                    fi
                    sleep 5
                fi
            done
        """
        echo "✅ Docker image built successfully"
    }
}
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
