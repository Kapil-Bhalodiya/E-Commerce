include "root" {
  path = find_in_parent_folders("live/terragrunt.hcl")
}

terraform {
  source = find_in_parent_folders("infra/bootstrap")
}

include "envcommon" {
  path = "${find_in_parent_folders("live")}/_envcommon/bootstrapcommon.hcl"
}

inputs = {
  public_apigw = []

  origin_request_policy = []

  cdn = []

  user_pools = {}

  user_pool_idps = {}
}
