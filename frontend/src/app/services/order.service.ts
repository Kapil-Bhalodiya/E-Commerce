import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { API_ENDPOINTS } from '../core/constants/api.constants'

export interface OrderData {
  cartForm: {
    items: any[]
  }
  deliveryAddressForm: {
    deliveryAddressId?: string
    newAddress?: any
  }
  paymentDetailForm: {
    method: string
    provider: string
    stripePaymentIntentId?: string
  }
  couponCode?: string
}

export interface OrderResponse {
  success: boolean
  data: {
    order: any
  }
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) {}

  createOrder(orderData: OrderData, userData: any): Observable<OrderResponse> {
    return this.http.post<OrderResponse>(`${environment.backendApi}${API_ENDPOINTS.ORDERS.BASE}`, {orderData, userData})
  }

  validateCoupon(couponCode: string): Observable<any> {
    return this.http.get(`${environment.backendApi}/api/coupons/validate/${couponCode}`)
  }

  createPaymentSession(): Observable<any> {
    return this.http.post(`${environment.backendApi}${API_ENDPOINTS.PAYMENTS.BASE}/create-checkout-session`, {})
  }

  getAllOrders(page: number = 1, limit: number = 5): Observable<any> {
    return this.http.get(`${environment.backendApi}/order`, {
      params: { page, limit }
    });
  }
}