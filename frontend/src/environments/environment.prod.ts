export const environment = {
  production: true,
  apiUrl: 'http://dev.sharkapp.local:8000/',
  backendApi: 'http://dev.sharkapp.local:8000/api',
  enableLogging: false,
  enableDebug: false,
  cacheTimeout: 600000, // 10 minutes
  retryAttempts: 2
}

// Use environment variable or secure config service in production
export const STRIPE_PK = "pk_test_51REP3lDBxXhwa9k2yzLbnYdr8eS6DuHnP9SbsYouNdlkZPK8GRhVfF1Bh9iHR1Vz5VwWc1b5BUIjKb5tJtPMT6lp00Ke5xIjSX"
