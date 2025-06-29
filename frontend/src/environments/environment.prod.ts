export const environment = {
  production: true,
  apiUrl: 'http://www.sharkapp.local:8000/',
  backendApi: 'http://www.sharkapp.local:8000/api',
  enableLogging: false,
  enableDebug: false,
  cacheTimeout: 600000, // 10 minutes
  retryAttempts: 2
}

// Use environment variable or secure config service in production
export const STRIPE_PK = "pk_live_your_production_stripe_key"
