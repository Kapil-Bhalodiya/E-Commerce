import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "./component/product-card/product-card.component";
import { BreadcrumbComponent } from "../../compoments/breadcrumb/breadcrumb.component";
import { ProductListHeaderComponent } from "./component/product-list-header/product-list-header.component";
import { ModalComponent } from "../../compoments/modal/modal.component";
import { CategoriesFilterComponent } from "../../compoments/filter/categories-filter/categories-filter.component";
import { RangeFilterComponent } from "../../compoments/filter/range-filter/range-filter.component";
import { ListFilterComponent } from "../../compoments/filter/list-filter/list-filter.component";
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.model';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ProductCardComponent, BreadcrumbComponent, ProductListHeaderComponent, CategoriesFilterComponent, RangeFilterComponent, ListFilterComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit{
 
  products: Product[] = [];
  checkboxItems = [
    { label: 'Denim Shirt', checked: false },
    { label: 'Party Wear', checked: false },
    { label: 'Sweat Shirt', checked: false },
    { label: 'Cotton Shirt', checked: false }
  ];
  brands = ['TrendyWear', 'EcoStyle', 'PureFit', 'Nike'];
  page = 1;
  totalPages = 1;
  filters: { minPrice?: number; maxPrice?: number; brands?: string[]; occasion?: string[] } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchProducts();
    // this.fetchAllProducts();
  }

  fetchProducts() {
    this.productService.fetchProducts(this.page, 4, this.filters).subscribe({
      next: (response) => {
        this.products = response.data.products;
        this.totalPages = response.data.pages;
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }

  fetchAllProducts(){
    this.productService.fetchAllProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        // this.totalPages = response.pages;
      },
      error: (error) => console.error('Error fetching products:', error)
    });
  }

  onCheckboxChange(selected: string[]) {
    this.filters.occasion = selected.length ? selected : undefined;
    this.page = 1;
    this.fetchProducts();
  }

  onPriceFilterApplied(range: { from: number; to: number }) {
    this.filters.minPrice = range.from;
    this.filters.maxPrice = range.to;
    this.page = 1;
    this.fetchProducts();
  }

  onCategoriesChange(selected: string[]) {
    this.filters.brands = selected;
    this.page = 1;
    this.fetchProducts();
  }

  onAddToCart(product: Product) {
    const cartItem: CartItem = {
      productId: product._id,
      name: product.name,
      price: product.base_price,
      quantity: 1,
      image: product.image_urls.find(() => true)
    };
  
    this.cartService.addToCart(cartItem);
    console.log(`${product.name} added to cart`);
  }

  onAddToWishlist() {
    console.log('Added to wishlist');
    // Implement wishlist logic here
  }

  onQuickView() {
    console.log('Quick view opened');
    // Implement modal logic here (e.g., open a dialog)
  }
}

