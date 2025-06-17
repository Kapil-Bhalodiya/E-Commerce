def call(String path, String imageName, String tag) {
    dir(path) {
        sh "docker build -t ${imageName}:${tag} ."
    }
}
