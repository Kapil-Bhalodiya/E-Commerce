resource "aws_secretsmanager_secret" "secrets" {
  for_each = var.secrets

  name                    = each.value.name
  description             = each.value.description
  kms_key_id              = var.kms_key_id
  recovery_window_in_days = var.recovery_window_in_days
  tags                    = var.tags
}
