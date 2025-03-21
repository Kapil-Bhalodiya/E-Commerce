const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const {userRouter} = require("./routes/user.routes")

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/user', userRouter)

module.exports = {app}