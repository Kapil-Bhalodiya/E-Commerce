variable "project"           { type = string }
variable "environment"       { type = string }
variable "s3_bucket_domain"  { type = string }
variable "acm_certificate_arn" {
  type    = string
  default = null
}
variable "price_class" {
  type    = string
  default = "PriceClass_100"
}
variable "tags" {
  type    = map(string)
  default = {}
}
