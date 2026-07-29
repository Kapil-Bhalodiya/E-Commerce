include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

include "envcommon" {
  path = find_in_parent_folders("live/_envcommon/ssmcommon.hcl")
}

terraform {
  source = find_in_parent_folders("infra/ssm")
}

dependency "kms" {
  config_path = "../kms"
}

inputs = {
  project     = "ecommerce"
  environment = "dev"
  kms_key_id  = dependency.kms.outputs.key_id

  secrets = {
    db_password = {
      name        = "ecommerce/dev/db/password"
      description = "RDS master password for dev"
    }
    jwt_secret = {
      name        = "ecommerce/dev/jwt/secret"
      description = "JWT signing secret for dev"
    }
    api_key = {
      name        = "ecommerce/dev/api/key"
      description = "Internal API key for dev"
    }
  }
}
