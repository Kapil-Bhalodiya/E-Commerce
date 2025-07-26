<<<<<<< HEAD
import { Component, EventEmitter, inject, Input, input, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ModalComponent } from "../../../../compoments/modal/modal.component";
import { RatingComponent } from "../../../../compoments/rating/rating.component";
import { Router } from '@angular/router';
import { Product } from '../../../../models/product.model';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  constructor(
    private router: Router,
    // private productModel: Product
  ) {}
  showModal: boolean = false;
  imageURL: string = environment.apiUrl;
  @Input() product:Product = {
    _id: '',
    name: '',
    description: '',
    brand: '',
    subcategory: '',
    base_price: 0,
    tags: [],
    dietary_needs: [],
    image_urls: [],
    variant_ids: []
  }
  
  @Output() addToCart = new EventEmitter<void>();
  @Output() addToWishlist = new EventEmitter<void>();
  @Output() quickView = new EventEmitter<void>();
  
  // cartService = inject(CartService)
  openModal() {
    this.showModal = true;
  }

  // Method to close the modal
  closeModal() {
    this.showModal = false;
  }
  
  onAddToCart() {
    this.addToCart.emit();
  }

  onAddToWishlist() {
    this.addToWishlist.emit();
  }

  onQuickView() {
    this.quickView.emit();
  }

  viewProduct(id: string) {
    this.router.navigate([`/product/product-detail/${id}`]);
  }
  
=======
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Router } from '@angular/router'
import { RatingComponent } from '../../../../components/rating/rating.component'
import { Product } from '../../../../models/product.model'
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product
  @Input() viewMode: 'grid' | 'list' = 'grid';
  @Output() addToCart = new EventEmitter<Product>()
  @Output() addToWishlist = new EventEmitter<Product>()
  @Output() quickView = new EventEmitter<Product>()
  
  readonly imageURL = environment.apiUrl
  showModal = false

  constructor(private router: Router) {}

  openModal(): void {
    this.showModal = true
  }

  closeModal(): void {
    this.showModal = false
  }
  
  onAddToCart(): void {
    this.addToCart.emit(this.product)
  }

  onAddToWishlist(): void {
    this.addToWishlist.emit(this.product)
  }

  onQuickView(): void {
    this.quickView.emit(this.product)
  }

  viewProduct(): void {
    this.router.navigate(['/product/product-detail', this.product._id])
  }

  getProductImage(): string {
    return this.product?.image_urls
      ? `${this.imageURL}/${this.product.image_urls[0]}`
      : 'assets/images/no-image.png'
  }

  trackByProductId(index: number, product: Product): string {
    return product._id
  }
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
}
