import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {}

  getKPIs(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/dashboard/kpis`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/dashboard/users`);
  }

//   getKPIUpdates(): Observable<any> {
//     return this.socket.fromEvent('kpi-update');
//   }
}