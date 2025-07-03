def call(String status, Map config) {
    script {
        def emoji = status == 'SUCCESS' ? '✅' : '❌'
        def message = "${emoji} ${config.serviceName} Pipeline ${status} - Build #${BUILD_NUMBER}"
        
        try {
            if (config.slackChannel) {
                def buildNum = env.BUILD_NUMBER ?: 'Unknown'
                def buildUrl = env.BUILD_URL ?: 'N/A'
                def imageTag = env.IMAGE_TAG ?: 'latest'
                def duration = currentBuild?.durationString ?: 'N/A'
                def branch = env.BRANCH_NAME ?: 'main'
                
                def slackMessage = """
                *${emoji} ${config.serviceName} Pipeline ${status}*

                📊 *Build:* #${buildNum}
                ⏱️ *Duration:* ${duration}
                🏷️ *Image:* ${imageTag}
                🌍 *Environment:* ${config.namespace}
                🌿 *Branch:* ${branch}

                *Pipeline Summary:*
                • ✅ Code checkout & setup
                • 🔍 Quality analysis
                • 🔒 Security scanning  
                • 🧪 Testing & linting
                • 🐳 Docker build & push
                • 🚀 Kubernetes deployment

                <${buildUrl}|📊 View Build> | <${buildUrl}console|📋 Console>
                """.trim()
                
                slackSend(
                    channel: config.slackChannel,
                    color: status == 'SUCCESS' ? 'good' : 'danger',
                    message: slackMessage
                )
            }
            
            if (config.emailRecipients) {
                def buildStatus = status == 'SUCCESS' ? 'SUCCESSFUL' : 'FAILED'
                def color = status == 'SUCCESS' ? '#28a745' : '#dc3545'
                def duration = currentBuild.durationString
                
                emailext(
                    subject: "${emoji} ${config.serviceName} Pipeline ${buildStatus} - Build #${BUILD_NUMBER}",
                    mimeType: 'text/html',
                    body: """
                    <html>
                    <body style="font-family: Arial, sans-serif; margin: 20px;">
                        <div style="border-left: 4px solid ${color}; padding: 20px; background-color: #f8f9fa;">
                            <h2 style="color: ${color}; margin-top: 0;">
                                ${emoji} ${config.serviceName} Pipeline ${buildStatus}
                            </h2>
                            
                            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                                <tr><td style="padding: 8px; font-weight: bold;">Build Number:</td><td style="padding: 8px;">#${BUILD_NUMBER}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">Service:</td><td style="padding: 8px;">${config.serviceName}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">Duration:</td><td style="padding: 8px;">${duration}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">Environment:</td><td style="padding: 8px;">${config.namespace}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">Image Tag:</td><td style="padding: 8px;">${env.IMAGE_TAG ?: 'latest'}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">Branch:</td><td style="padding: 8px;">${env.BRANCH_NAME ?: 'main'}</td></tr>
                                <tr><td style="padding: 8px; font-weight: bold;">Commit:</td><td style="padding: 8px;">${env.GIT_COMMIT?.take(8) ?: 'N/A'}</td></tr>
                            </table>
                            
                            <h3>Pipeline Stages:</h3>
                            <ul style="list-style-type: none; padding: 0;">
                                <li style="padding: 5px 0;">✅ Setup & Checkout</li>
                                <li style="padding: 5px 0;">🔍 Code Quality (SonarQube)</li>
                                <li style="padding: 5px 0;">🔒 Security Scan (Trivy)</li>
                                <li style="padding: 5px 0;">📦 Dependency Check (OWASP)</li>
                                <li style="padding: 5px 0;">🧪 Tests & Linting</li>
                                <li style="padding: 5px 0;">🐳 Docker Build & Push</li>
                                <li style="padding: 5px 0;">🚀 Kubernetes Deploy</li>
                            </ul>
                            
                            <div style="margin: 20px 0; padding: 15px; background-color: #e9ecef; border-radius: 5px;">
                                <strong>Build Details:</strong><br>
                                <a href="${BUILD_URL}" style="color: #007bff; text-decoration: none;">📊 View Full Build Log</a><br>
                                <a href="${BUILD_URL}console" style="color: #007bff; text-decoration: none;">📋 Console Output</a>
                            </div>
                            
                            <p style="margin-top: 20px; color: #6c757d; font-size: 12px;">
                                Generated by Jenkins CI/CD Pipeline<br>
                                Timestamp: ${new Date()}
                            </p>
                        </div>
                    </body>
                    </html>
                    """,
                    to: config.emailRecipients
                )
            }
            
            echo "✅ Notifications sent"
        } catch (Exception e) {
            echo "⚠️ Notification failed: ${e.message}"
        }
    }
}