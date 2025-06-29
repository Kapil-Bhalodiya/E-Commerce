import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-checkout-complete',
  imports: [SpinnerComponent, CommonModule],
  templateUrl: './checkout-complete.component.html',
  styleUrl: './checkout-complete.component.scss'
})
export class CheckoutCompleteComponent implements OnInit{
  orderData: any
  orderResponse: any;
  isLoading: boolean = false
  constructor(
    private router: Router,
    private orderService: OrderService,
    public cartService: CartService
  ) {
    this.orderData = JSON.parse(localStorage.getItem('orderForm') as string)
  }
  ngOnInit(): void {
    this.createOrder()
  }

  createOrder() {
    this.isLoading = true
    this.orderService.createOrder(this.orderData).subscribe({
      next: (response: any) => {
        this.isLoading = false
        this.orderResponse = response.data
        this.cartService.clearCart();
      },
      error: (error: any) => {
        this.isLoading = false
        console.error('Checkout error:', error);
        alert(error.message || 'Failed to create order');
      },
    });
  }

  retrnToShopping() {
    this.router.navigate(['/'])
  }
}

