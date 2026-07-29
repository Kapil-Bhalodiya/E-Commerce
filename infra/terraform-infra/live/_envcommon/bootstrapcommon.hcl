locals {
  env_vars       = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  environment         = local.env_vars.locals.environment
  ams_environment_tag = local.env_vars.locals.ams_environment_tag
}

inputs = {
  project       = "ecommerce"
  environment   = local.environment
  region        = local.ams_environment_tag == "PRD" ? "eu-west-1" : "us-east-1"
  aws_account_id = "000000000000"
  domain_name   = local.environment == "prod" ? "ecommerce.example.com" : "ecommerce-dev.example.com"

  enable_frontend = true
  enable_ecr      = true
  enable_cognito  = true
  enable_kms      = true
  enable_waf      = true
  create_public_zone = local.environment == "prod"

  public_apigw = []
  origin_request_policy = []
  cdn = []
  user_pools = {}
  user_pool_idps = {}


  default_tags = {
    Environment = local.ams_environment_tag
    Stage       = local.environment
    ManagedBy   = "Terraform"
    Project     = "E-Commerce"
  }
}
