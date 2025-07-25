import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { ProductCardComponent } from '../../../pages/products/component/product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="product__section--inner product__grid--inner">
      <div class="row" [ngClass]="gridClass" *ngIf="viewMode === 'grid'">
        <div class="col mb-30" *ngFor="let product of products; trackBy: trackByProduct">
          <app-product-card 
            [product]="product"
            [viewMode]="'grid'"
            (addToCart)="addToCart.emit($event)"
            (addToWishlist)="addToWishlist.emit($event)"
            (quickView)="quickView.emit($event)">
          </app-product-card>
        </div>
      </div>
      <div *ngIf="viewMode === 'list'" class="product-list-card" >
        <app-product-card 
          *ngFor="let product of products; trackBy: trackByProduct"
          [product]="product"
          [viewMode]="'list'"
          (addToCart)="addToCart.emit($event)"
          (addToWishlist)="addToWishlist.emit($event)"
          (quickView)="quickView.emit($event)">
        </app-product-card>
      </div>
    </div>
  `
})
export class ProductGridComponent {
  @Input() products: Product[] = [];
  @Input() columns = 4;
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() addToCart = new EventEmitter<Product>();
  @Output() addToWishlist = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();

  constructor(private router: Router) {}

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

  navigateToProduct(product: Product): void {
    this.router.navigate(['/product/product-detail', product._id]);
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/120x120?text=No+Image';
  }
}