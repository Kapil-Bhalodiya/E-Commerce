import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { BreadcrumbComponent } from "../../../../compoments/breadcrumb/breadcrumb.component";
import { SocialShareComponent } from "../../../../compoments/social-share/social-share.component";
import { CarouselsComponent } from "../../../../compoments/carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { RatingComponent } from "../../../../compoments/rating/rating.component";
import { RadioVariantComponent } from "../../../../compoments/radio-variant/radio-variant.component";
import { QuantityBoxComponent } from "../../../../compoments/quantity-box/quantity-box.component";
import { PrimaryButtonComponent } from "../../../../compoments/primary-button/primary-button.component";
=======
import { BreadcrumbComponent } from "../../../../components/breadcrumb/breadcrumb.component";
import { SocialShareComponent } from "../../../../components/social-share/social-share.component";
import { CarouselsComponent } from "../../../../components/carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { RatingComponent } from "../../../../components/rating/rating.component";
import { RadioVariantComponent } from "../../../../components/radio-variant/radio-variant.component";
import { QuantityBoxComponent } from "../../../../components/quantity-box/quantity-box.component";
import { PrimaryButtonComponent } from "../../../../components/primary-button/primary-button.component";
import { ToastComponent } from "../../../../shared/components/toast/toast.component";
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/product.model';
import { Variant } from '../../../../models/productvariant.model';
<<<<<<< HEAD
=======
import { CartService } from '../../../../services/cart.service';
import { CartItem } from '../../../../models/cartItem.model';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

@Component({
  selector: 'app-product-detail',
  imports: [BreadcrumbComponent,
    SocialShareComponent,
    CarouselsComponent,
    CommonModule,
    RatingComponent,
    RadioVariantComponent,
    QuantityBoxComponent,
<<<<<<< HEAD
    PrimaryButtonComponent
=======
    PrimaryButtonComponent,
    ToastComponent
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  selectedVariant: Variant | null = null;
<<<<<<< HEAD
  productImages = [
    { id: '1', src: 'Men/Tshirt/Whale Shark/Whale Shark - Blue.webp' },
    { id: '2', src: 'Men/Tshirt/Whale Shark/Whale Shark - Blue.webp' }
  ];
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

  productColors = [
    '#FFB6C1',
    '#F08080',
    '#FFA07A',
    '#FFE4E1',
    '#FFDAB9'];

  productSizes = ['S', 'M', 'L', 'XL']

  selectedSize: string = this.productSizes[0];
  selectedColor: string = this.productColors[0];
<<<<<<< HEAD

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
=======
  selectedQuantity: number = 1;
  
  // Toast properties
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.fetchProduct(productId);
    }
  }

  fetchProduct(id: string): void {
    this.productService.getProductById(id).subscribe({
<<<<<<< HEAD
      next: (product) => {
        this.product = product;
=======
      next: (response: any) => {
        this.product = response.data || response;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
    this.selectedColor = size;
=======
    this.selectedSize = size;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    this.updateSelectedVariant();
  }

  onColorChange(color: string) {
    this.selectedColor = color;
    this.updateSelectedVariant();
  }

  getCurrentPrice(): number {
<<<<<<< HEAD
    if (this.product && this.selectedVariant) {
      return this.product.base_price + (this.selectedVariant.price || 0);
=======
    if (this.selectedVariant) {
      return this.selectedVariant.price || this.product?.base_price || 0;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    }
    return this.product?.base_price || 0;
  }

  addToCart(): void {
<<<<<<< HEAD
    if (this.product && this.selectedVariant) {
      console.log(`Added to cart: ${this.product.name}, Color: ${this.selectedColor}, Size: ${this.selectedSize}, SKU: ${this.selectedVariant}`);
      // Implement cart logic here
    }
=======
    if (!this.product) return;
    
    if (!this.selectedVariant) {
      this.showToastMessage('Please select size and color before adding to cart.', 'warning');
      return;
    }
    
    if (this.selectedVariant.stock_quantity <= 0) {
      this.showToastMessage('Sorry, this variant is out of stock!', 'error');
      return;
    }
    const cartItem: CartItem = {
      productId: this.product._id,
      name: this.product.name,
      price: this.product.base_price,
      quantity: 1,
      image: this.product.image_urls?.[0]
    };
    this.cartService.addToCart(cartItem)
    this.showToastMessage(`Added ${this.product.name} (${this.selectedColor} - ${this.selectedSize}) to cart!`, 'success');
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  buyNow(): void {
    if (this.product && this.selectedVariant) {
<<<<<<< HEAD
      console.log(`Buy now: ${this.product.name}, Color: ${this.selectedColor}, Size: ${this.selectedSize}, SKU: ${this.selectedVariant}`);
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      // Implement buy now logic
    }
  }

  addToWishlist(): void {
    if (this.product) {
<<<<<<< HEAD
      console.log(`Added to wishlist: ${this.product.name}`);
      // Implement wishlist logic
    }
  }
=======
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
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
}
