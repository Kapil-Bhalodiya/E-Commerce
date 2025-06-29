import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred'
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = error.error?.message || 'Bad Request'
          break
        case 401:
          errorMessage = 'Unauthorized access'
          break
        case 403:
          errorMessage = 'Access forbidden'
          break
        case 404:
          errorMessage = 'Resource not found'
          break
        case 500:
          errorMessage = 'Internal server error'
          break
        default:
          errorMessage = error.error?.message || errorMessage
      }
    }
    
    console.error('HTTP Error:', error)
    return throwError(() => new Error(errorMessage))
  }
}