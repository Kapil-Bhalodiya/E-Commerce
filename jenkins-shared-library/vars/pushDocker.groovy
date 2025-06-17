def call(String imageName, String tag, String registryCredsId) {
    withCredentials([usernamePassword(credentialsId: registryCredsId, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
        sh "echo $PASS | docker login -u $USER --password-stdin"
        sh "docker push ${imageName}:${tag}"
    }
}
