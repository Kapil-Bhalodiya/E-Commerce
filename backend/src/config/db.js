const mongoose = require("mongoose");
const config = require('./config');
const logger = require('../utils/logger');

const connectDB = async () => {
    console.log(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
        logger.info(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        logger.info("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

module.exports = {connectDB}