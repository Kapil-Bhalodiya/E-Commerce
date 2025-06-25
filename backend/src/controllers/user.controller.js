const User = require("../models/user.model");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");
const { asyncHandler } = require("../utils/asyncHandler");


const testingApi = (req,res) => {
    res.send("Api working Fine..")
    console.log("Api Working Fine..")
}

const registerUser = asyncHandler(async (req,res) => {
    const {firstName, lastName, email, contact, password} = req.body
    const fullName = `${firstName} ${lastName}`;
    if([firstName, lastName, email, contact, password].some((feild) => feild)  === '') 
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

const loginHandler = asyncHandler(async (req,res) => {
    const {email, contact, password} = req.body
    if(!contact && !email) throw new ApiError(400, "Email or Contact Number is Required.!")
    const user = await User.findOne({
        $or: [{email}, {contact}]
    })
    if(!user) throw new ApiError(404, "User not Found.!")

    const checkPass = await user.isPasswordCorrect(password)

    if(!checkPass) throw new ApiError(401, "Invalid Credentials.!")

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
    const loggedInUser =  await User.findById(user._id).select("-password -refreshToken")
    
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(
        200,{
            user: loggedInUser, accessToken, refreshToken
        }, "User LoggedIn Successfully.!",true
    ))
})

const logoutUser = asyncHandler(async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id, 
        {
            $set: {refreshToken: null}
        },{new: true}
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Logout SuccessFully.!"))

})

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, "Something went worng while generating Token.!")
    }
}

module.exports = {testingApi, registerUser, loginHandler, logoutUser}