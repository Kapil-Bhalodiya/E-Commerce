import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
//   private apiUrl = 'https://your-backend-api.com/ap'; // Adjust URL

  constructor(private http: HttpClient) {}

  createPaymentIntent(amount: number): Observable<string> {
    return this.http.post<string>(`${environment.apiUrl}/payment/create-payment-intent`, { amount });
  }

  confirmPayment(data: { paymentIntentId: string; deliveryAddressId: string; amount: number }): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/confirm-payment`, data);
  }

  confirmCOD(deliveryAddressId: string): Observable<void> {
    return this.http.post<void>(`${environment.apiUrl}/confirm-cod`, { deliveryAddressId });
  }
}