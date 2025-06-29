const { connectDB } = require('./config/db')
const { app } = require('./app')
const logger = require('./utils/logger')
require('dotenv').config()

const PORT = process.env.PORT || 8000
let server

connectDB()
  .then(() => {
    server = app.listen(PORT, () => {
      logger.info(`Server running on PORT: ${PORT}`)
      logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  })
  .catch((err) => {
    logger.error('MongoDB connection failed:', err)
    process.exit(1)
  })

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  server.close(() => {
    logger.info('Process terminated')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  server.close(() => {
    logger.info('Process terminated')
    process.exit(0)
  })
})

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Promise Rejection:', err)
  server.close(() => {
    process.exit(1)
  })
})

process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception:', err)
  process.exit(1)
})
