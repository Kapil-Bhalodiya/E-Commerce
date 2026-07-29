variable "project"     { type = string }
variable "environment" { type = string }
variable "kms_key_id"  { 
  type = string 
  default = null 
}

variable "recovery_window_in_days" { 
  type = number
  default = 30 
}

variable "tags" { 
  type = map(string)
  default = {} 
}

variable "secrets" {
  type = map(object({
    name        = string
    description = string
  }))
  default = {}
}
