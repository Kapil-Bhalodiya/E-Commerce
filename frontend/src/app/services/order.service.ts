import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = '/api/orders';
  private couponApiUrl = '/api/coupons';

  constructor(private http: HttpClient) {}

  /**
   * Creates an order by sending data to the backend
   * @param orderData Contains items, shippingAddressId, paymentMethod, couponCode, and notes
   */
  createOrder(orderData: any): Observable<any> {
    return this.http.post(`${environment.apiUrl}/order`, orderData);
  }

  /**
   * Validates a coupon code by checking with the backend
   * @param couponCode The coupon code to validate
   */
  validateCoupon(couponCode: string): Observable<any> {
    return this.http.get(`${this.couponApiUrl}/validate/${couponCode}`);
  }
  payment(): Observable<any> {
    return this.http.post(`${this.couponApiUrl}/create-checkout-session`, {})
  }
}