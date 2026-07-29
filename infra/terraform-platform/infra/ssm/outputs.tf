output "secret_arns" {
  value = { for k, v in aws_secretsmanager_secret.secrets : k => v.arn }
}
