output "frontend_bucket_name" {
  description = "S3 frontend bucket name"
  value       = var.enable_frontend ? aws_s3_bucket.frontend[0].id : null
}

output "frontend_bucket_arn" {
  description = "S3 frontend bucket ARN"
  value       = var.enable_frontend ? aws_s3_bucket.frontend[0].arn : null
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = var.enable_frontend ? aws_cloudfront_distribution.frontend[0].id : null
}

output "cloudfront_domain_name" {
  description = "CloudFront distribution domain name"
  value       = var.enable_frontend ? aws_cloudfront_distribution.frontend[0].domain_name : null
}

output "cognito_user_pool_id" {
  description = "Cognito user pool ID"
  value       = var.enable_cognito ? aws_cognito_user_pool.ecommerce[0].id : null
}

output "kms_key_arn" {
  description = "E-commerce KMS key ARN"
  value       = var.enable_kms ? aws_kms_key.ecommerce[0].arn : null
}

output "kms_key_id" {
  description = "E-commerce KMS key ID"
  value       = var.enable_kms ? aws_kms_key.ecommerce[0].key_id : null
}

output "waf_acl_arn" {
  description = "WAF web ACL ARN"
  value       = var.enable_waf ? aws_wafv2_web_acl.ecommerce[0].arn : null
}

output "backend_ecr_repository_url" {
  description = "Backend ECR repository URL"
  value       = var.enable_ecr ? aws_ecr_repository.backend[0].repository_url : null
}

output "frontend_ecr_repository_url" {
  description = "Frontend ECR repository URL"
  value       = var.enable_ecr ? aws_ecr_repository.frontend[0].repository_url : null
}
