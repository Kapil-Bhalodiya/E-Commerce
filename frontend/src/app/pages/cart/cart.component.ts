import { Component, inject } from '@angular/core';
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CartService } from '../../services/cart.service';
import { OrderSummaryComponent } from "./order-summary/order-summary.component";

@Component({
  selector: 'app-cart',
  imports: [CartItemComponent, OrderSummaryComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartService = inject(CartService)
}
