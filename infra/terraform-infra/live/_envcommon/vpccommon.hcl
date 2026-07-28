locals {
  env_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))
  environment = local.env_vars.locals.environment
  ams_environment_tag = local.env_vars.locals.ams_environment_tag
}

inputs = {
  default_tags = {
    Environment = local.ams_environment_tag
    Stage       = local.environment
    ManagedBy   = "Terraform"
    Project     = "E-Commerce"
  }
}