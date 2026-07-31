include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

include "envcommon" {
  path = find_in_parent_folders("live/_envcommon/cloudfrontcommon.hcl")
}

terraform {
  source = find_in_parent_folders("infra/cloudfront")
}

dependency "s3" {
  config_path = "../s3"
}

inputs = {
  project          = "ecommerce"
  environment      = "dev"
  s3_bucket_domain = "${dependency.s3.outputs.bucket_ids["assets"]}.s3.amazonaws.com"
  price_class      = "PriceClass_100"
}
