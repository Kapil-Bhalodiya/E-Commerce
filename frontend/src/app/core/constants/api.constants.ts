export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/user/login',
    REGISTER: '/user/register',
    LOGOUT: '/user/logout',
    REFRESH: '/user/refresh'
  },
  PRODUCTS: {
    BASE: '/products',
    VARIANTS: '/product-variants'
  },
  CATEGORIES: {
    BASE: '/categories',
    SUB: '/subcategories'
  },
  ORDERS: {
    BASE: '/order'
  },
  ADDRESSES: {
    BASE: '/address'
  },
  PAYMENTS: {
    BASE: '/payment'
  }
} as const

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER: 'user_data',
  CART: 'cart',
  ORDER: 'order',
  THEME: 'theme_preference'
} as const