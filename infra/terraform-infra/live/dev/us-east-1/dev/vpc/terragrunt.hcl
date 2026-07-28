include "root" {
  path = "${find_in_parent_folders("live")}/terragrunt.hcl"
}

terraform {
  source = "${find_in_parent_folders("infra")}/vpc"
}

include "envcommon" {
  path = "${(find_in_parent_folders("live"))}/_envcommon/vpccommon.hcl"
}

inputs = {
  vpc_cidr = "10.0.0.0/16"
  availability_zones = ["us-east-1a", "us-east-1b"]
  public_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  private_subnets = ["10.0.11.0/24", "10.0.12.0/24"]
  enable_nat_gateway = true
  enable_vpn_gateway = false
}