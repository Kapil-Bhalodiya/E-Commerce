def call(String status, Map config) {
    script {
        def emoji = status == 'SUCCESS' ? '✅' : '❌'
        def message = "${emoji} ${config.serviceName} Pipeline ${status} - Build #${BUILD_NUMBER}"
        
        try {
            // Slack notification
            if (config.slackChannel) {
                slackSend(
                    channel: config.slackChannel,
                    color: status == 'SUCCESS' ? 'good' : 'danger',
                    message: message,
                    tokenCredentialId: 'SlackToken'
                )
            }
            
            // Email notification (failures only)
            if (status != 'SUCCESS' && config.emailRecipients) {
                emailext(
                    subject: message,
                    body: "Build URL: ${BUILD_URL}",
                    to: config.emailRecipients
                )
            }
            
            echo "✅ Notifications sent"
        } catch (Exception e) {
            echo "⚠️ Notification failed: ${e.message}"
        }
    }
}