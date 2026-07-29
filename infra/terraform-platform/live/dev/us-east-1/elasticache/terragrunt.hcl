include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

include "envcommon" {
  path = find_in_parent_folders("live/_envcommon/elasticachecommon.hcl")
}

terraform {
  source = find_in_parent_folders("infra/elasticache")
}

dependency "kms" {
  config_path = "../kms"
}

dependency "vpc" {
  config_path = "../../../../../terraform-infra/live/dev/us-east-1/dev/vpc"
}

inputs = {
  project     = "ecommerce"
  environment = "dev"
  kms_key_id  = dependency.kms.outputs.key_arn

  vpc_id     = dependency.vpc.outputs.vpc_id
  subnet_ids = dependency.vpc.outputs.private_subnet_ids

  node_type          = "cache.t3.micro"
  num_cache_clusters = 1
  engine_version     = "7.0"
  allowed_cidr_blocks = ["10.0.0.0/16"]
}
