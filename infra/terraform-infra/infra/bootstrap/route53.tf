data "aws_route53_zone" "main" {
  count = var.create_public_zone && var.domain_name != "" ? 1 : 0

  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_record" "frontend" {
  count = var.create_public_zone && var.domain_name != "" ? 1 : 0

  zone_id = data.aws_route53_zone.main[0].zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend[0].domain_name
    zone_id                = aws_cloudfront_distribution.frontend[0].hosted_zone_id
    evaluate_target_health = false
  }
}
