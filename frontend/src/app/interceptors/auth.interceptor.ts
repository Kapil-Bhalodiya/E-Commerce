import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http'
import { inject } from '@angular/core'
import { catchError, throwError } from 'rxjs'
import { Router } from '@angular/router'
import { STORAGE_KEYS } from '../core/constants/api.constants'

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
  
  // Skip auth for public endpoints
  const publicEndpoints = ['/login', '/register', '/products']
  const isPublicEndpoint = publicEndpoints.some(endpoint => req.url.includes(endpoint))
  
  let authReq = req
  if (token && !isPublicEndpoint) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }
  
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Token expired or invalid
        localStorage.removeItem(STORAGE_KEYS.TOKEN)
        localStorage.removeItem(STORAGE_KEYS.USER)
        router.navigate(['/login'])
      }
      return throwError(() => error)
    })
  )
}
