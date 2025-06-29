const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const path = require('path')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const logger = require('./utils/logger')

const {userRouter} = require("./routes/user.routes")
const {categoryRouter} = require("./routes/categories.routes")
const {subCategoryRoutes} = require("./routes/subcategories.routes")
const {productRoutes} = require("./routes/products.routes")
const {productVariantRoutes} = require("./routes/productvariants.routes")
const {addressRoutes} = require("./routes/address.routes")
const {orderRoutes} = require("./routes/order.routes")
const {paymentRoutes} = require("./routes/payment.routes")

const app = express()
const client = require('prom-client')

// Security middleware
app.use(helmet())

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP'
})
app.use('/api/', limiter)

const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || ['http://localhost:4200']

app.use(cors({
  origin: (origin, callback) => {
    // If the origin is in the allowedOrigins list or if it's undefined (for example, Postman)
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      logger.warn('CORS not allowed for origin:', origin)
      callback(new Error('CORS not allowed'), false)
    }
  },
  credentials: true,
}));

const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['status'],
})

client.collectDefaultMetrics();

// CORS middleware

app.use('/uploads', express.static(path.join(__dirname, '../public')));

app.use(express.json({limit: "20kb"}))
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

app.use('/api/user', userRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/product-variants', productVariantRoutes);
app.use('/api/address', addressRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ 
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV
    })
})

app.get('/', (req, res) => {
  httpRequestsTotal.inc({ status: '200' });
  res.send('Hello World');
});

// Expose /metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType)
  res.end(await client.register.metrics())
})

// Global error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err)
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors: Object.values(err.errors).map(e => e.message)
    })
  }
  
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format'
    })
  }
  
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

module.exports = { app }