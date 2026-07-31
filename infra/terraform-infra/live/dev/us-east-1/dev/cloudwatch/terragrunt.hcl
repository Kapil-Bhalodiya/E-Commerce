include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

terraform {
  source = find_in_parent_folders("infra/cloudwatch")
}

inputs = {
  environment = "dev"
  region      = "us-east-1"
  project     = "ecommerce"
}
