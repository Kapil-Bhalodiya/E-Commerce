resource "aws_kms_key" "ecommerce" {
  count = var.enable_kms ? 1 : 0

  description         = "E-commerce shared KMS key for ${var.environment}"
  enable_key_rotation = true
  deletion_window_in_days = 10

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Sid    = "EnableRootAccount"
        Effect = "Allow"
        Principal = {
          AWS = "arn:aws:iam::${var.aws_account_id}:root"
        }
        Action   = "kms:*"
        Resource = "*"
      }
    ]
  })

  tags = merge(
    var.tags,
    {
      Name        = "${var.project}-kms-${var.environment}"
      Environment = var.environment
      Project     = var.project
      ManagedBy   = "Terraform"
    }
  )
}

resource "aws_kms_alias" "ecommerce" {
  count = var.enable_kms ? 1 : 0

  name          = "alias/${var.project}-kms-${var.environment}"
  target_key_id = aws_kms_key.ecommerce[0].key_id
}
