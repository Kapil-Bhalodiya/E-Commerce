import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../models/product.model';
import { PrimaryButtonComponent } from "../../../compoments/primary-button/primary-button.component";
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [PrimaryButtonComponent, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  cartService = inject(CartService)
  product = input.required<Product>()
}
