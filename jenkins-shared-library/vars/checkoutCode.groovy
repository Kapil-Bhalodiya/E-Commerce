def call(Map gitConfig) {
    checkout([
        $class: 'GitSCM',
        branches: [[name: gitConfig.branch ?: '*/main']],
        userRemoteConfigs: [[
            url: gitConfig.url,
            credentialsId: gitConfig.credentialsId
        ]],
        poll: true
    ])
}