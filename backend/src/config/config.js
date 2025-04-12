require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGODB_URI,
    logLevel: process.env.LOG_LEVEL || 'info'
};

module.exports = config;