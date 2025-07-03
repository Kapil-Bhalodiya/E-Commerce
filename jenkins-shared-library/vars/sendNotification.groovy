def call(String status, Map config) {
    script {
        try {
            def color = ''
            def emoji = ''
            def message = ''
            
            switch(status) {
                case 'SUCCESS':
                    color = 'good'
                    emoji = '✅'
                    message = "Deployment completed successfully"
                    break
                case 'FAILURE':
                    color = 'danger'
                    emoji = '❌'
                    message = "Deployment failed"
                    break
                case 'UNSTABLE':
                    color = 'warning'
                    emoji = '⚠️'
                    message = "Deployment completed with warnings"
                    break
                default:
                    color = 'warning'
                    emoji = '❓'
                    message = "Deployment status unknown"
            }
            
            def buildUrl = "${env.BUILD_URL}"
            def gitCommit = env.GIT_COMMIT ?: 'unknown'
            def buildDuration = currentBuild.durationString
            
            // Slack notification
            try {
                slackSend(
                    channel: config.slackChannel ?: '#ci-cd',
                    color: color,
                    message: """
${emoji} *${config.serviceName} Pipeline ${status}*
*Build:* <${buildUrl}|#${env.BUILD_NUMBER}>
*Branch:* ${env.BRANCH_NAME ?: 'main'}
*Commit:* ${gitCommit}
*Duration:* ${buildDuration}
*Message:* ${message}
*Environment:* ${config.namespace}
                    """.trim()
                )
                echo "✅ Slack notification sent"
            } catch (Exception e) {
                echo "⚠️ Failed to send Slack notification: ${e.getMessage()}"
            }
            
            // Email notification
            try {
                def emailSubject = "${emoji} ${config.serviceName} Pipeline ${status} - Build #${env.BUILD_NUMBER}"
                def emailBody = """
<h2>${config.serviceName} Pipeline ${status}</h2>
<p><strong>Build:</strong> <a href="${buildUrl}">#${env.BUILD_NUMBER}</a></p>
<p><strong>Branch:</strong> ${env.BRANCH_NAME ?: 'main'}</p>
<p><strong>Commit:</strong> ${gitCommit}</p>
<p><strong>Duration:</strong> ${buildDuration}</p>
<p><strong>Environment:</strong> ${config.namespace}</p>
<p><strong>Status:</strong> ${message}</p>

<h3>Pipeline Stages:</h3>
<ul>
    <li>Code Quality Analysis (SonarQube)</li>
    <li>Security Scanning (Trivy)</li>
    <li>Dependency Check (OWASP)</li>
    <li>Unit Tests & Linting</li>
    <li>Container Security Scan</li>
    <li>Deployment</li>
    <li>Post-Deploy Tests</li>
</ul>

<p>View detailed reports: <a href="${buildUrl}">Jenkins Build</a></p>
                """.trim()
                
                emailext(
                    subject: emailSubject,
                    body: emailBody,
                    mimeType: 'text/html',
                    to: config.emailRecipients ?: 'devops@company.com',
                    attachLog: status == 'FAILURE'
                )
                echo "✅ Email notification sent"
            } catch (Exception e) {
                echo "⚠️ Failed to send email notification: ${e.getMessage()}"
            }
            
            // Teams notification (if configured)
            if (config.teamsWebhook) {
                try {
                    def teamsMessage = [
                        "@type": "MessageCard",
                        "@context": "https://schema.org/extensions",
                        "summary": "${config.serviceName} Pipeline ${status}",
                        "themeColor": color == 'good' ? '00FF00' : (color == 'danger' ? 'FF0000' : 'FFFF00'),
                        "sections": [[
                            "activityTitle": "${emoji} ${config.serviceName} Pipeline ${status}",
                            "activitySubtitle": "Build #${env.BUILD_NUMBER}",
                            "facts": [
                                ["name": "Branch", "value": env.BRANCH_NAME ?: 'main'],
                                ["name": "Commit", "value": gitCommit],
                                ["name": "Duration", "value": buildDuration],
                                ["name": "Environment", "value": config.namespace]
                            ]
                        ]],
                        "potentialAction": [[
                            "@type": "OpenUri",
                            "name": "View Build",
                            "targets": [["os": "default", "uri": buildUrl]]
                        ]]
                    ]
                    
                    httpRequest(
                        httpMode: 'POST',
                        url: config.teamsWebhook,
                        contentType: 'APPLICATION_JSON',
                        requestBody: groovy.json.JsonOutput.toJson(teamsMessage)
                    )
                    echo "✅ Teams notification sent"
                } catch (Exception e) {
                    echo "⚠️ Failed to send Teams notification: ${e.getMessage()}"
                }
            }
            
        } catch (Exception e) {
            echo "❌ Notification failed: ${e.getMessage()}"
        }
    }
}