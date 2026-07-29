terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.31.0"
    }
  }
}

provider "aws" {
  region                      = "us-east-1"
  profile                     = "floci"

  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true
  s3_force_path_style         = true

  endpoints {
    ec2             = "http://localhost:4566"
    iam             = "http://localhost:4566"
    s3              = "http://localhost:4566"
    rds             = "http://localhost:4566"
    elasticache     = "http://localhost:4566"
    eks             = "http://localhost:4566"
    sts             = "http://localhost:4566"
    cloudformation  = "http://localhost:4566"
    logs            = "http://localhost:4566"
    kms             = "http://localhost:4566"
    sqs             = "http://localhost:4566"
    secretsmanager  = "http://localhost:4566"
    cognito-idp     = "http://localhost:4566"
    cognito-identity = "http://localhost:4566"
  }

  default_tags {
    tags = {
      Environment = "DEV"
      Project     = "ecommerce"
      ManagedBy   = "Terraform"
      Layer       = "platform"
    }
  }
}
