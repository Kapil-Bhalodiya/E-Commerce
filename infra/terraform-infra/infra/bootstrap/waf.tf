resource "aws_wafv2_web_acl" "ecommerce" {
  count = var.enable_waf ? 1 : 0

  name        = "${var.project}-waf-${var.environment}"
  scope       = "REGIONAL"
  description = "WAF for ${var.project} ${var.environment}"

  default_action {
    allow {}
  }

  rule {
    name     = "AWSManagedRulesCommonRuleSet"
    priority = 1

    action {
      block {}
    }

    statement {
      managed_rule_group_statement {
        name        = "AWSManagedRulesCommonRuleSet"
        vendor_name = "AWS"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "${var.project}-common-rules"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "${var.project}-waf"
    sampled_requests_enabled   = true
  }

  tags = merge(
    var.tags,
    {
      Name        = "${var.project}-waf-${var.environment}"
      Environment = var.environment
      Project     = var.project
      ManagedBy   = "Terraform"
    }
  )
}
