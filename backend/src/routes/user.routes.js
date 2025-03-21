const {Router} = require("express")
const { registerUser, loginHandler, logoutUser } = require("../controllers/user.controller")
const jwtVerify = require("../middlewares/auth.middleware")
const userRouter = Router()

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginHandler)
userRouter.route("/logout").post(jwtVerify, logoutUser)

module.exports = {userRouter}