variable "project"     { type = string }
variable "environment" { type = string }
variable "vpc_id"      { type = string }
variable "subnet_ids"  { type = list(string) }
variable "kms_key_id" {
  type    = string
  default = null
}
variable "tags" {
  type    = map(string)
  default = {}
}

variable "engine" {
  type    = string
  default = "postgres"
}
variable "engine_version" {
  type    = string
  default = "15"
}
variable "instance_class" {
  type    = string
  default = "db.t3.micro"
}
variable "allocated_storage" {
  type    = number
  default = 20
}
variable "db_name"     { type = string }
variable "db_username" { type = string }
variable "db_password" {
  type      = string
  sensitive = true
}
variable "db_port" {
  type    = number
  default = 5432
}

variable "allowed_cidr_blocks" {
  type    = list(string)
  default = []
}
variable "backup_retention_period" {
  type    = number
  default = 7
}
