import { Component, computed, inject } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { PrimaryButtonComponent } from "../../../compoments/primary-button/primary-button.component";

@Component({
  selector: 'app-order-summary',
  imports: [PrimaryButtonComponent],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  cartService = inject(CartService)
  total = computed(() => {
    let total = 0
    this.cartService.cartProducts().map(product => {
      total += product.price
    })
    return total
  })
}
