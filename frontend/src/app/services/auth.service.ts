<<<<<<< HEAD
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
=======
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, BehaviorSubject, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { API_ENDPOINTS, STORAGE_KEYS } from '../core/constants/api.constants'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface AuthResponse {
  success: boolean
  data: {
    user: any
    accessToken: string
  }
  message: string
}
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
  constructor(
    private http: HttpClient
  ) { }

  onRegister(registerData: any): Observable<any> {
    return this.http.post(`${environment.backendApi}/user/register`, registerData)
  }
  
  onLogin(email: string, password: string): Observable<any> {
    const body = { email, password }
    return this.http.post(`${environment.backendApi}/user/login`, body)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post(`${environment.backendApi}/user/logout`,null)
=======
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasValidToken())
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable()

  constructor(private http: HttpClient) {}

  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.backendApi}${API_ENDPOINTS.AUTH.REGISTER}`, registerData)
      .pipe(tap(response => this.handleAuthSuccess(response)))
  }
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.backendApi}${API_ENDPOINTS.AUTH.LOGIN}`, credentials)
      .pipe(tap(response => this.handleAuthSuccess(response)))
  }

  logout(): Observable<any> {
    this.clearAuthData()
    return this.http.post(`${environment.backendApi}${API_ENDPOINTS.AUTH.LOGOUT}`, {})
  }

  isAuthenticated(): boolean {
    return this.hasValidToken()
  }

  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN)
  }

  private handleAuthSuccess(response: AuthResponse): void {
    if (response.success && response.data.accessToken) {
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.data.accessToken)
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.data.user))
      this.isAuthenticatedSubject.next(true)
    }
  }

  private clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN)
    localStorage.removeItem(STORAGE_KEYS.USER)
    this.isAuthenticatedSubject.next(false)
  }

  private hasValidToken(): boolean {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN)
    return !!token
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }
}