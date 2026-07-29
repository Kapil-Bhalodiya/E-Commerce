locals {
  default_redirect_sign_in_url  = "https://${var.enable_frontend ? aws_cloudfront_distribution.frontend[0].domain_name : ""}/"
  default_redirect_sign_out_url = "https://${var.enable_frontend ? aws_cloudfront_distribution.frontend[0].domain_name : ""}/"
}

resource "aws_cognito_user_pool" "ecommerce" {
  count = var.enable_cognito ? 1 : 0

  name = "${var.project}-users-${var.environment}"

  username_attributes      = ["email"]
  auto_verified_attributes = ["email"]
  mfa_configuration        = "OFF"

  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_uppercase                = true
    require_numbers                  = true
    require_symbols                 = false
    temporary_password_validity_days = 7
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project}-users-${var.environment}"
      Environment = var.environment
      Project     = var.project
      ManagedBy   = "Terraform"
    }
  )
}


