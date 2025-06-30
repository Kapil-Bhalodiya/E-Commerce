import { Component, OnInit, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from "./component/product-card/product-card.component";
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
  imports: [CommonModule, ProductCardComponent, BreadcrumbComponent, 
    ProductListHeaderComponent, CategoriesFilterComponent, RangeFilterComponent, PaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {

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
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService.fetchProducts(this.page, 4, this.filters).subscribe({
      next: (response) => {
        this.products = response.data.products;
        this.totalPages = response.data.totalPages;
      },
      error: (error) => {
        // Handle error appropriately
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
    const checkLoggedInUser = localStorage.getItem('auth_token')
    if(checkLoggedInUser){ 
    const cartItem: CartItem = {
      productId: product._id,
      name: product.name,
      price: product.base_price,
      quantity: 1,
      image: product.image_urls.find(() => true)
    };
    this.cartService.addToCart(cartItem);
    } else this.router.navigate(['/login'])
  }

  onAddToWishlist(product: Product) {
    // Implement wishlist logic
  }

  onQuickView(product: Product) {
    // Implement modal logic (e.g., open a dialog)
  }

  onPageChange(newPage: number) {
    this.page = newPage;
    this.fetchProducts(); // call your API
  }
}

