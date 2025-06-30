import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../../../components/breadcrumb/breadcrumb.component";
import { SocialShareComponent } from "../../../../components/social-share/social-share.component";
import { CarouselsComponent } from "../../../../components/carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { RatingComponent } from "../../../../components/rating/rating.component";
import { RadioVariantComponent } from "../../../../components/radio-variant/radio-variant.component";
import { QuantityBoxComponent } from "../../../../components/quantity-box/quantity-box.component";
import { PrimaryButtonComponent } from "../../../../components/primary-button/primary-button.component";
import { ToastComponent } from "../../../../shared/components/toast/toast.component";
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';
import { Variant } from '../../../../models/productvariant.model';

@Component({
  selector: 'app-product-detail',
  imports: [BreadcrumbComponent,
    SocialShareComponent,
    CarouselsComponent,
    CommonModule,
    RatingComponent,
    RadioVariantComponent,
    QuantityBoxComponent,
    PrimaryButtonComponent,
    ToastComponent
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  selectedVariant: Variant | null = null;
  productImages = [
    { id: '1', src: 'Men/Tshirt/Whale Shark/Whale Shark - Blue.webp' },
    { id: '2', src: 'Men/Tshirt/Whale Shark/Whale Shark - Blue.webp' }
  ];

  productColors = [
    '#FFB6C1',
    '#F08080',
    '#FFA07A',
    '#FFE4E1',
    '#FFDAB9'];

  productSizes = ['S', 'M', 'L', 'XL']

  selectedSize: string = this.productSizes[0];
  selectedColor: string = this.productColors[0];
  selectedQuantity: number = 1;
  
  // Toast properties
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(productId);
    }
  }

  fetchProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
      next: (response: any) => {
        this.product = response.data || response;
        this.initializeVariants();
      },
      error: (err) => {
        console.error('Error fetching product:', err);
      }
    });
  }

  initializeVariants(): void {
    if (this.product?.variant_ids && Array.isArray(this.product.variant_ids)) {
      // Extract unique colors and sizes
      const variants = this.product.variant_ids as Variant[];
      this.productColors = [...new Set(variants.map(v => v.color))];
      this.productSizes = [...new Set(variants.map(v => v.size))];

      // Initialize selections
      this.selectedColor = this.productColors[0] || '';
      this.selectedSize = this.productSizes[0] || '';

      // Set initial variant
      this.updateSelectedVariant();
    }
  }

  updateSelectedVariant(): void {
    if (this.product?.variant_ids && Array.isArray(this.product.variant_ids)) {
      const variants = this.product.variant_ids as Variant[];
      this.selectedVariant = variants.find(
        v => v.color === this.selectedColor && v.size === this.selectedSize
      ) || null;
    }
  }

  onSizeChange(size: string) {
    this.selectedSize = size;
    this.updateSelectedVariant();
  }

  onColorChange(color: string) {
    this.selectedColor = color;
    this.updateSelectedVariant();
  }

  getCurrentPrice(): number {
    if (this.selectedVariant) {
      return this.selectedVariant.price || this.product?.base_price || 0;
    }
    return this.product?.base_price || 0;
  }

  addToCart(): void {
    if (!this.product) return;
    
    if (!this.selectedVariant) {
      this.showToastMessage('Please select size and color before adding to cart.', 'warning');
      return;
    }
    
    if (this.selectedVariant.stock_quantity <= 0) {
      this.showToastMessage('Sorry, this variant is out of stock!', 'error');
      return;
    }
    
    this.showToastMessage(`Added ${this.product.name} (${this.selectedColor} - ${this.selectedSize}) to cart!`, 'success');
  }

  buyNow(): void {
    if (this.product && this.selectedVariant) {
      // Implement buy now logic
    }
  }

  addToWishlist(): void {
    if (this.product) {
      this.showToastMessage(`Added ${this.product.name} to wishlist!`, 'success');
    }
  }

  showToastMessage(message: string, type: 'success' | 'error' | 'warning') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }

  getStockStatusClass(): string {
    if (!this.selectedVariant) return 'out-of-stock';
    
    const stock = this.selectedVariant.stock_quantity;
    if (stock <= 0) return 'out-of-stock';
    if (stock <= 5) return 'low-stock';
    return 'in-stock';
  }

  getStockStatusText(): string {
    if (!this.selectedVariant) return 'Select variant';
    
    const stock = this.selectedVariant.stock_quantity;
    if (stock <= 0) return 'Out of Stock';
    if (stock <= 5) return `Only ${stock} left in stock`;
    return 'In Stock';
  }

  getStockIcon(): string {
    if (!this.selectedVariant) return 'bi-question-circle';
    
    const stock = this.selectedVariant.stock_quantity;
    if (stock <= 0) return 'bi-x-circle';
    if (stock <= 5) return 'bi-exclamation-triangle';
    return 'bi-check-circle';
  }

  onQuantityChange(quantity: number): void {
    this.selectedQuantity = quantity;
  }

  getMaxQuantity(): number {
    return this.selectedVariant?.stock_quantity || 10;
  }
}
