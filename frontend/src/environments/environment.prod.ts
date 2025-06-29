export const environment = {
  production: true,
  apiUrl: 'https://api.yourdomain.com',
  backendApi: 'https://api.yourdomain.com/api',
  enableLogging: false,
  enableDebug: false,
  cacheTimeout: 600000, // 10 minutes
  retryAttempts: 2
}

// Use environment variable or secure config service in production
export const STRIPE_PK = "pk_live_your_production_stripe_key"
