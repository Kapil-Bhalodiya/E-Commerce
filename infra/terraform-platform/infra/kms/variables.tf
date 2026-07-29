variable "project"     { type = string }
variable "environment" { type = string }
variable "deletion_window_in_days" { 
    type = number
    default = 30 
}
variable "tags" { 
    type = map(string)
    default = {} 
}
