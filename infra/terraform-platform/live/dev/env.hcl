locals {
  environment         = "dev"
  ams_environment_tag = "DEV"
  state_bucket        = "ecommerce-terraform-state-dev-us-east-1"
  dynamodb_table      = "ecommerce-terraform-state-lock-dev-us-east-1"
  project             = "ecommerce"
}
