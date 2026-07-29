resource "aws_ecr_repository" "backend" {
  count = var.enable_ecr ? 1 : 0

  name         = "${var.project}-backend-${var.environment}"
  force_delete = var.environment == "dev" ? true : false

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
    kms_key         = var.enable_kms ? aws_kms_key.ecommerce[0].arn : null
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project}-backend-${var.environment}"
      Environment = var.environment
      Project     = var.project
      ManagedBy   = "Terraform"
    }
  )
}

resource "aws_ecr_repository" "frontend" {
  count = var.enable_ecr ? 1 : 0

  name         = "${var.project}-frontend-${var.environment}"
  force_delete = var.environment == "dev" ? true : false

  image_scanning_configuration {
    scan_on_push = true
  }

  encryption_configuration {
    encryption_type = "KMS"
    kms_key         = var.enable_kms ? aws_kms_key.ecommerce[0].arn : null
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project}-frontend-${var.environment}"
      Environment = var.environment
      Project     = var.project
      ManagedBy   = "Terraform"
    }
  )
}
