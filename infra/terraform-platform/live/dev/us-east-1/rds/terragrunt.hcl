include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

include "envcommon" {
  path = find_in_parent_folders("live/_envcommon/rdscommon.hcl")
}

terraform {
  source = find_in_parent_folders("infra/rds")
}

dependency "kms" {
  config_path = "../kms"
}

# Cross-repo dependency: reads VPC outputs from terraform-infra remote state
dependency "vpc" {
  config_path = "D:/e-commerce/infra/terraform-infra/live/dev/us-east-1/dev/vpc"
}

inputs = {
  project     = "ecommerce"
  environment = "dev"
  kms_key_id  = dependency.kms.outputs.key_arn

  vpc_id     = dependency.vpc.outputs.vpc_id
  subnet_ids = dependency.vpc.outputs.private_subnet_ids

  engine         = "postgres"
  engine_version = "15"
  instance_class = "db.t3.micro"
  db_name        = "ecommerce"
  db_username    = "ecommerce_admin"
  db_password    = "CHANGE_ME_USE_SECRETS_MANAGER"

  allowed_cidr_blocks     = ["10.0.0.0/16"]
  backup_retention_period = 3
}
