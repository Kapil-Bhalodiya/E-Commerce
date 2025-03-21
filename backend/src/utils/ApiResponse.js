class ApiResponse {
    constructor(statusCode, data, message="ApiResponse", success){
        this.statusCode = statusCode
        this.data = data,
        this.message = message
        this.success = false || success
    }
}

module.exports = {ApiResponse}