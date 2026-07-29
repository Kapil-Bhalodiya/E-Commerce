variable "project"     { type = string }
variable "environment" { type = string }
variable "vpc_id"      { type = string }
variable "subnet_ids"  { type = list(string) }
variable "kms_key_id"  { 
    type = string 
    default = null 
}
variable "tags" { 
    type = map(string)
    default = {} 
}

variable "node_type" { 
    type = string
    default = "cache.t3.micro" 
}
variable "num_cache_clusters" { 
    type = number
    default = 1 
}
variable "engine_version"     { 
    type = string
    default = "7.0" 
}
variable "allowed_cidr_blocks" { 
    type = list(string)
    default = [] 
}