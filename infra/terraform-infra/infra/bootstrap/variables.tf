variable "project" {
  type        = string
  description = "Project name used for resource naming"
}

variable "environment" {
  type        = string
  description = "Environment name (dev, prod, etc.)"
}

variable "region" {
  type        = string
  description = "AWS region"
}

variable "aws_account_id" {
  type        = string
  description = "AWS account ID"
}

variable "domain_name" {
  type        = string
  default     = ""
  description = "Root domain name (e.g. example.com)"
}

variable "enable_frontend" {
  type        = bool
  default     = true
  description = "Whether to create S3 bucket for frontend"
}

variable "enable_cloudfront" {
  type        = bool
  default     = true
  description = "Whether to create CloudFront distribution and OAC"
}

variable "enable_ecr" {
  type        = bool
  default     = true
  description = "Whether to create ECR repositories"
}

variable "enable_cognito" {
  type        = bool
  default     = true
  description = "Whether to create Cognito user pool"
}

variable "enable_kms" {
  type        = bool
  default     = true
  description = "Whether to create KMS keys"
}

variable "enable_waf" {
  type        = bool
  default     = true
  description = "Whether to create WAF web acl"
}

variable "create_public_zone" {
  type        = bool
  default     = false
  description = "Whether to create a public Route53 hosted zone"
}

variable "public_apigw" {
  type = list(object({
    name                   = string
    enable_web_acl         = bool
    enable_access_logging  = bool
    override_vpc_link_name = optional(string, null)
    custom_domain = object({
      create             = optional(bool, false)
      subdomain          = optional(string)
      create_dns_record  = optional(bool, false)
    })
  }))
  description = "List of public API Gateway definitions"
  default     = []
}

variable "origin_request_policy" {
  type = list(object({
    name = string
    cookies = object({
      cookie_behaviour = string
      items            = optional(list(string), [])
    })
    headers = object({
      header_behaviour = string
      items            = optional(list(string), [])
    })
    query_strings = object({
      query_string_behaviour = string
      items                  = optional(list(string), [])
    })
  }))
  description = "CloudFront origin request policy definitions"
  default     = []
}

variable "cdn" {
  type = list(object({
    name                    = string
    aliases                 = optional(list(string), [])
    enabled                 = optional(bool, true)
    retain_on_delete        = optional(bool, true)
    viewer_certificate      = optional(map(string))
    disable_dns_records     = optional(bool, false)
    s3_kms_key              = optional(string)
    s3_frontend_origin      = optional(bool, false)
    default_root_object     = optional(string)
    under_maintenance       = optional(bool, false)
    security_header_function_name = optional(string, "")
    response_headers_policy = optional(string)
    api_origin_request_policy = optional(string)
    api_origin_enabled      = optional(bool, true)
    spa_response_code       = optional(string, "403")
    geo_restriction         = optional(any, {})
  }))
  description = "List of CDN definitions"
  default     = []
}

variable "user_pools" {
  type = map(object({
    name_override              = optional(string)
    auto_verified_attributes   = optional(list(string), [])
    mfa_configuration          = string
    sms_authentication_message = optional(string)
    user_attribute_update_settings = optional(any)
    deletion_protection        = optional(bool, true)
    username_configuration     = optional(any, {})
    admin_create_user_config = optional(object({
      allow_admin_create_user_only = optional(bool, false)
      email_message                = optional(string)
      email_subject                = optional(string)
      sms_message                  = optional(string)
    }), {
      allow_admin_create_user_only = false
      email_message                = null
      email_subject                = null
      sms_message                  = null
    })
    email_configuration = optional(any, {
      email_sending_account = "COGNITO_DEFAULT"
    })
    email_verification_message = optional(string)
    email_verification_subject = optional(string)
    verification_message_template = optional(any, {
      default_email_option  = "CONFIRM_WITH_CODE"
      email_message_by_link = null
      email_subject_by_link = null
    })
    lambda_config = optional(any)
    password_policy = optional(object({
      minimum_length                   = optional(number, 8)
      require_lowercase                = optional(bool, true)
      require_uppercase                = optional(bool, true)
      require_numbers                  = optional(bool, true)
      require_symbols                  = optional(bool, false)
      temporary_password_validity_days = optional(number, 7)
    }), {
      minimum_length                   = 8
      require_lowercase                = true
      require_uppercase                = true
      require_numbers                  = true
      require_symbols                  = false
      temporary_password_validity_days = 7
    })
  }))
  description = "Map of Cognito user pool configurations"
  default     = {}
}

variable "user_pool_idps" {
  type = map(list(object({
    name = string
    type = string
    provider_details = object({
      attributes_request_method = optional(string, "GET")
      attributes_url           = string
      attributes_url_add_attributes = optional(string, "false")
      authorize_scopes         = string
      authorize_url            = string
      client_id                = string
      jwks_uri                 = string
      oidc_issuer              = string
      token_url                = string
    })
    attribute_mapping = optional(any)
  })))
  description = "Map of user pool identity providers"
  default     = {}
}

variable "tags" {
  type        = map(string)
  default     = {}
  description = "Additional tags applied to resources"
}
