import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductCardComponent } from '../../../pages/products/component/product-card/product-card.component';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product__section--inner product__grid--inner">
      <div class="row" [ngClass]="gridClass">
        <div class="col mb-30" *ngFor="let product of products; trackBy: trackByProduct">
          <app-product-card 
            [product]="product"
            (addToCart)="addToCart.emit($event)"
            (addToWishlist)="addToWishlist.emit($event)"
            (quickView)="quickView.emit($event)">
          </app-product-card>
        </div>
      </div>
    </div>
  `
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Input() columns = 4;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() addToWishlist = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();

  get gridClass(): string {
    const colMap: Record<number, string> = {
      2: 'row-cols-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-2',
      3: 'row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-3', 
      4: 'row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4',
      6: 'row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6'
    };
    return `${colMap[this.columns] || colMap[4]} mb--n30`;
  }

  trackByProduct(index: number, product: Product): string {
    return product._id;
  }
}