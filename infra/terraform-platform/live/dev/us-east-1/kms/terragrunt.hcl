include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

include "envcommon" {
  path = find_in_parent_folders("live/_envcommon/kmscommon.hcl")
}

terraform {
  source = find_in_parent_folders("infra/kms")
}

inputs = {
  project                 = "ecommerce"
  environment             = "dev"
  deletion_window_in_days = 30
}
