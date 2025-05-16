import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
  }
}