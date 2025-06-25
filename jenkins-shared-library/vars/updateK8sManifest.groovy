def call(String helmPath, String imageTag) {
    dir("${WORKSPACE}/${helmPath}") {
        sh """
            sed -i -E 's|^(\\s*tag:) .*|\\1 "${imageTag}"|' values.yaml
            echo "📝 Updated values.yaml with new image tag: ${imageTag}"
            cat values.yaml | grep -A 2 -B 2 "tag:"
        """
    }
}