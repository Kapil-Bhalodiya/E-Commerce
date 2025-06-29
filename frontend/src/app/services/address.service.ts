import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { Address } from '../models/address.model'
import { environment } from '../../environments/environment'
import { API_ENDPOINTS } from '../core/constants/api.constants'

export interface AddressResponse {
  success: boolean
  data: Address[]
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<AddressResponse>(`${environment.backendApi}${API_ENDPOINTS.ADDRESSES.BASE}`)
      .pipe(map(response => response.data))
  }

  addAddress(address: Partial<Address>): Observable<Address> {
    return this.http.post<{ success: boolean; data: Address; message: string }>(
      `${environment.backendApi}${API_ENDPOINTS.ADDRESSES.BASE}`, 
      address
    ).pipe(map(response => response.data))
  }

  updateAddress(id: string, address: Partial<Address>): Observable<Address> {
    return this.http.put<{ success: boolean; data: Address; message: string }>(
      `${environment.backendApi}${API_ENDPOINTS.ADDRESSES.BASE}/${id}`, 
      address
    ).pipe(map(response => response.data))
  }

  deleteAddress(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.backendApi}${API_ENDPOINTS.ADDRESSES.BASE}/${id}`)
  }
}