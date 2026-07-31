module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 18.0"

  cluster_name    = var.cluster_name
  cluster_version = var.cluster_version

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  vpc_id     = var.vpc_id
  subnet_ids = var.subnet_ids

  eks_managed_node_group_defaults = {
    ami_type       = "AL2_x86_64"
    instance_types = ["t3.medium"]
  }

  eks_managed_node_groups = {
    for name, config in var.node_groups : name => {
      name            = "${var.cluster_name}-${name}"
      desired_size    = config.desired_size
      min_size        = config.min_size
      max_size        = config.max_size
      instance_types  = config.instance_types
      capacity_type   = config.capacity_type
      disk_size       = 50

      tags = {
        NodeGroup = name
      }
    }
  }

  cluster_addons = {
    coredns = {
      most_recent = true
    }
    kube-proxy = {
      most_recent = true
    }
    vpc-cni = {
      most_recent = true
    }
  }

  tags = var.tags
}

resource "aws_ec2_tag" "cluster_autoscaler" {
  count       = var.enable_cluster_autoscaler ? 1 : 0
  resource_id = module.eks.cluster_id
  key         = "k8s.io/cluster-autoscaler/${var.cluster_name}"
  value       = "owned"
}
