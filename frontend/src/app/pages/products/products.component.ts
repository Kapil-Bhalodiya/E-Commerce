import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { ProductFilters } from '../../shared/interfaces/product.interface';
import { PRODUCT_DATA } from '../../shared/data/product.data';
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";
import { ProductListHeaderComponent } from "./component/product-list-header/product-list-header.component";
import { CategoriesFilterComponent } from "../../components/filter/categories-filter/categories-filter.component";
import { RangeFilterComponent } from "../../components/filter/range-filter/range-filter.component";
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cartItem.model';
import { PaginationComponent } from "../../components/pagination/pagination.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, BreadcrumbComponent, ProductListHeaderComponent, 
    CategoriesFilterComponent, RangeFilterComponent, PaginationComponent, ProductGridComponent, PrimaryButtonComponent, ToastComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

  products: Product[] = [];
  page = 1;
  totalPages = 1;
  totalCount = 0;
  isLoading = false;
  error: string | null = null;
  filters: ProductFilters = { limit: 4 };
  
  // Toast properties
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
  readonly occasionFilters = PRODUCT_DATA.occasionFilters;
  readonly brandFilters = PRODUCT_DATA.brandFilters.map(b => b.label);
  readonly tagFilters = PRODUCT_DATA.tagFilters.map(t => t.label);

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.isLoading = true;
    this.error = null;
    
    this.productService.fetchProducts(this.page, this.filters.limit || 4, this.filters).subscribe({
      next: (response: any) => {
        this.products = response.data.products || [];
        this.totalPages = response.data.pages || 1;
        this.totalCount = response.data.total || 0;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load products. Please try again.';
        this.isLoading = false;
        console.error('Error fetching products:', error);
      }
    });
  }

  fetchAllProducts() {
    this.productService.fetchAllProducts().subscribe({
      next: (response) => {
        this.products = response.data.products;
      },
      error: (error) => {
        // Handle error appropriately
      }
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
    if (!localStorage.getItem('auth_token')) {
      this.router.navigate(['/login']);
      return;
    }

    // Check if product has stock
    const hasStock = product.variant_ids?.some((variant: any) => variant.stock_quantity > 0);
    if (!hasStock) {
      this.showToastMessage('Sorry, this product is out of stock!', 'error');
      return;
    }
    
    const cartItem: CartItem = {
      productId: product._id,
      name: product.name,
      price: product.base_price,
      quantity: 1,
      image: product.image_urls?.[0]
    };
    this.cartService.addToCart(cartItem);
    this.showToastMessage('Product added to cart successfully!', 'success');
  }

  onAddToWishlist(product: Product) {
    // Implement wishlist logic
  }

  onQuickView(product: Product) {
    // Implement modal logic (e.g., open a dialog)
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.fetchProducts();
  }

  onSearch(searchTerm: string) {
    this.filters.search = searchTerm || undefined;
    this.page = 1;
    this.fetchProducts();
  }

  onSortChange(sortValue: string) {
    this.filters.sortBy = sortValue;
    this.page = 1;
    this.fetchProducts();
  }

  onPageSizeChange(pageSize: number) {
    this.filters.limit = pageSize;
    this.page = 1;
    this.fetchProducts();
  }

  onTagsChange(selected: string[]) {
    this.filters.tags = selected.length ? selected : undefined;
    this.page = 1;
    this.fetchProducts();
  }

  showToastMessage(message: string, type: 'success' | 'error' | 'warning') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
}

