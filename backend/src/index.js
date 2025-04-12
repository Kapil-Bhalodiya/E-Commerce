const {connectDB} = require('./config/db')
const {app} = require('./app');
require('dotenv').config()

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is tunning on PORT : ", process.env.PORT)
    })
})
.catch((err) => {
    console.error("MONGO db connection failed !!! ", err)
})
