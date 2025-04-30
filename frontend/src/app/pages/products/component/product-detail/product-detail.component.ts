import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../../../compoments/breadcrumb/breadcrumb.component";
import { SocialShareComponent } from "../../../../compoments/social-share/social-share.component";
import { CarouselsComponent } from "../../../../compoments/carousel/carousel.component";
import { CommonModule } from '@angular/common';
import { RatingComponent } from "../../../../compoments/rating/rating.component";
import { RadioVariantComponent } from "../../../../compoments/radio-variant/radio-variant.component";
import { QuantityBoxComponent } from "../../../../compoments/quantity-box/quantity-box.component";
import { PrimaryButtonComponent } from "../../../../compoments/primary-button/primary-button.component";
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
    PrimaryButtonComponent
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
      next: (product) => {
        this.product = product;
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
    this.selectedColor = size;
    this.updateSelectedVariant();
  }

  onColorChange(color: string) {
    this.selectedColor = color;
    this.updateSelectedVariant();
  }

  getCurrentPrice(): number {
    if (this.product && this.selectedVariant) {
      return this.product.base_price + (this.selectedVariant.price || 0);
    }
    return this.product?.base_price || 0;
  }

  addToCart(): void {
    if (this.product && this.selectedVariant) {
      console.log(`Added to cart: ${this.product.name}, Color: ${this.selectedColor}, Size: ${this.selectedSize}, SKU: ${this.selectedVariant}`);
      // Implement cart logic here
    }
  }

  buyNow(): void {
    if (this.product && this.selectedVariant) {
      console.log(`Buy now: ${this.product.name}, Color: ${this.selectedColor}, Size: ${this.selectedSize}, SKU: ${this.selectedVariant}`);
      // Implement buy now logic
    }
  }

  addToWishlist(): void {
    if (this.product) {
      console.log(`Added to wishlist: ${this.product.name}`);
      // Implement wishlist logic
    }
  }
}
