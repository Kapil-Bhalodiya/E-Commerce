const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");


const registerUser = asyncHandler(async (req,res) => {
    const {fullName, email, contact, password} = req.body
    if([fullName, email, contact, password].some((feild) => feild.trim())  === '') 
        throw new ApiError(400, message= "All Feilds are Required..!")

    const existingUser = await User.findOne({
        $or: [{email}, {contact}]
    })

    if(existingUser) throw new ApiError(409, message="User already Exist");
    
    const user = await User.create({fullName, email, contact, password})

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    console.log(createdUser)
    if(!createdUser) throw new ApiError(500, "Something went wrong while registering User..!")
    
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered..!", true)
    ) 
})

module.exports = {registerUser}