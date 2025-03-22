import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiUrl } from "../../environment/environemt.common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient
  ) { }

  onRegister(registerData: any): Observable<any> {
    return this.http.post(`${apiUrl}/user/register`, registerData)
  }
  
  onLogin(email: string, password: string): Observable<any> {
    const body = { email, password }
    return this.http.post(`${apiUrl}/user/login`, body)
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): Observable<any> {
    localStorage.removeItem('token');
    return this.http.post(`${apiUrl}/user/logout`,null)
  }
}