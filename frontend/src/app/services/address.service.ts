import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Address } from '../models/address.model';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private apiUrl = '/api/address'; // Backend endpoint (to be added)

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<{ data: Address[] }>(`${environment.apiUrl}/address`)
    .pipe(map((response) => response.data));;
  }

  addAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(`${environment.apiUrl}/address`, address);
  }
}