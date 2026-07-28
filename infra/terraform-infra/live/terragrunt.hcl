locals {
  account_vars     = read_terragrunt_config(find_in_parent_folders("account.hcl"))
  region_vars      = read_terragrunt_config(find_in_parent_folders("region.hcl"))
  environment_vars = read_terragrunt_config(find_in_parent_folders("env.hcl"))

  account_name       = local.account_vars.locals.account_name
  account_id         = local.account_vars.locals.aws_account_id
  aws_primary_region = local.region_vars.locals.aws_region
  aws_profile        = local.account_vars.locals.aws_profile
  ams_environment_tag = local.environment_vars.locals.ams_environment_tag
}

# Generate AWS provider configuration
generate "provider" {
  path      = "provider.tf"
  if_exists = "overwrite_terragrunt"
  contents  = <<-EOF
  terraform {
    required_providers {
      aws = {
        source  = "hashicorp/aws"
        version = "~> 5.0"
      }
    }
  }

  provider "aws" {
    region  = "${local.aws_primary_region}"
    profile = "${local.aws_profile}"

    # Floci (LocalStack) configuration
    skip_credentials_validation = true
    skip_metadata_api_check      = true
    skip_requesting_account_id   = true

    endpoints {
      ec2            = "http://localhost:4566"
      iam            = "http://localhost:4566"
      s3             = "http://localhost:4566"
      rds            = "http://localhost:4566"
      elasticache    = "http://localhost:4566"
      eks            = "http://localhost:4566"
      sts            = "http://localhost:4566"
      cloudformation = "http://localhost:4566"
      logs           = "http://localhost:4566"
      kms            = "http://localhost:4566"
      sqs            = "http://localhost:4566"
      secretsmanager = "http://localhost:4566"
    }

    default_tags {
      tags = {
        Environment = "${local.ams_environment_tag}"
        Project     = "ecommerce"
        ManagedBy   = "Terraform"
      }
    }
  }
  EOF
}

# Use local backend for Floci development
remote_state {
  backend = "local"
  config = {
    path = "${get_terragrunt_dir()}/.terraform/terraform.tfstate"
  }
  generate = {
    path      = "backend.tf"
    if_exists = "overwrite_terragrunt"
  }
}

inputs = merge(
  local.account_vars.locals,
  local.region_vars.locals,
  local.environment_vars.locals,
)
