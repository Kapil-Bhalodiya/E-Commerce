export const environment = {
<<<<<<< HEAD
    production: true,
    apiUrl: 'http://www.sharkapp.local:8000',
    backendApi: 'http://www.sharkapp.local:8000/api'
};

=======
  production: true,
  apiUrl: 'http://dev.sharkapp.local:8000',
  backendApi: 'http://dev.sharkapp.local:8000/api',
  enableLogging: false,
  enableDebug: false,
  cacheTimeout: 600000, // 10 minutes
  retryAttempts: 2
}

// Use environment variable or secure config service in production
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
export const STRIPE_PK = "pk_test_51REP3lDBxXhwa9k2yzLbnYdr8eS6DuHnP9SbsYouNdlkZPK8GRhVfF1Bh9iHR1Vz5VwWc1b5BUIjKb5tJtPMT6lp00Ke5xIjSX"
