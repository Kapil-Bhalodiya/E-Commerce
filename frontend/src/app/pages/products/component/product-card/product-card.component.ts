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
<<<<<<< HEAD
=======
  @Input() viewMode: 'grid' | 'list' = 'grid';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
    return `${this.imageURL}/${this.product.image_urls?.[0]}`
=======
    return this.product?.image_urls
      ? `${this.imageURL}/${this.product.image_urls[0]}`
      : 'assets/images/no-image.png'
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  trackByProductId(index: number, product: Product): string {
    return product._id
  }
}
