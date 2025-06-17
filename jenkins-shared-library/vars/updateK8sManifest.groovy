def call(String manifestPath, String imageName, String tag) {
    sh "sed -i 's|image: ${imageName}:.*|image: ${imageName}:${tag}|' ${manifestPath}"
}
