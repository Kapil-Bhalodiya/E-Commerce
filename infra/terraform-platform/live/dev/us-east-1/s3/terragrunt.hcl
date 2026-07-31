include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

include "envcommon" {
  path = find_in_parent_folders("live/_envcommon/s3common.hcl")
}

terraform {
  source = find_in_parent_folders("infra/s3")
}

dependency "kms" {
  config_path = "../kms"
}

inputs = {
  project     = "ecommerce"
  environment = "dev"
  kms_key_id  = dependency.kms.outputs.key_id

  buckets = {
    assets = {
      versioning = false
      public     = false
    }
    uploads = {
      versioning = true
      public     = false
    }
    backups = {
      versioning = true
      public     = false
    }
  }
}
