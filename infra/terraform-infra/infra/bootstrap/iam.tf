data "aws_caller_identity" "current" {}

data "aws_iam_policy_document" "cognito_assume_role" {
  statement {
    effect = "Allow"

    actions = ["sts:AssumeRoleWithWebIdentity"]

    principals {
      type        = "Federated"
      identifiers = ["cognito-identity.amazonaws.com"]
    }
  }
}
