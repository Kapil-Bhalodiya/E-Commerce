locals {
  environment         = "dev"
  ams_environment_tag = "NPRD"
  state_bucket        = "ecommerce-terraform-state-dev"
  dynamodb_table      = "ecommerce-terraform-state-lock-dev"
  aws_region          = "us-east-1"
  aws_profile         = "floci"
  project             = "ecommerce"
}
