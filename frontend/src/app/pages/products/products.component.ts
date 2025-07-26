import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { ProductGridComponent } from '../../shared/components/product-grid/product-grid.component';
import { PrimaryButtonComponent } from '../../components/primary-button/primary-button.component';
import { ToastComponent } from '../../shared/components/toast/toast.component';
<<<<<<< HEAD
import { ProductFilters } from '../../shared/interfaces/product.interface';
import { PRODUCT_DATA } from '../../shared/data/product.data';
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
import { BreadcrumbComponent } from "../../components/breadcrumb/breadcrumb.component";
import { ProductListHeaderComponent } from "./component/product-list-header/product-list-header.component";
import { CategoriesFilterComponent } from "../../components/filter/categories-filter/categories-filter.component";
import { RangeFilterComponent } from "../../components/filter/range-filter/range-filter.component";
<<<<<<< HEAD
import { ProductService } from '../../services/product.service';
=======
import { ProductService, ProductFilters } from '../../services/product.service';
import { CategoryService, Category } from '../../services/category.service';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
  page = 1;
=======
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  page = 1;
  pageSize = 4;
  
  get categoryNames(): string[] {
    return this.categories.map(category => category.name);
  }
  
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  totalPages = 1;
  totalCount = 0;
  isLoading = false;
  error: string | null = null;
  filters: ProductFilters = { limit: 4 };
<<<<<<< HEAD
=======
  viewMode: 'grid' | 'list' = 'grid';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  
  // Toast properties
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
<<<<<<< HEAD
  readonly occasionFilters = PRODUCT_DATA.occasionFilters;
  readonly brandFilters = PRODUCT_DATA.brandFilters.map(b => b.label);
  readonly tagFilters = PRODUCT_DATA.tagFilters.map(t => t.label);

  constructor(
    private productService: ProductService,
=======

  get brandFilters(): string[] {
    const brands = this.allProducts.map(product => product.brand).filter(Boolean);
    return [...new Set(brands)];
  }
  
  get tagFilters(): string[] {
    const tags = this.allProducts.flatMap(product => product.tags || []).filter(Boolean);
    return [...new Set(tags)];
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD
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
=======
    this.fetchCategories();
    this.fetchAllProducts();
  }

  // fetchProducts() {
  //   this.isLoading = true;
  //   this.error = null;
  //   this.productService.fetchProducts(this.page, this.filters.limit || 4, this.filters).subscribe({
  //     next: (response: any) => {
  //       this.products = response.data.products || [];
  //       this.totalPages = response.data.pages || 1;
  //       this.totalCount = response.data.total || 0;
  //       this.isLoading = false;
  //     },
  //     error: (error) => {
  //       this.isLoading = false;
  //       console.error('Error fetching products:', error);
  //     }
  //   });
  // }

  fetchAllProducts() {
    this.isLoading = true;
    this.productService.fetchAllProducts().subscribe({
      next: (response) => {
        this.allProducts = response.data.products || [];
        this.filteredProducts = [...this.allProducts];
        this.applyClientSideFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error fetching all products:', error);
      }
    });
  }
  
  applyClientSideFilters() {
    let filtered = [...this.allProducts];
    
    if (this.filters.categories && this.filters.categories.length) {
      let allSubcategoryIds: string[] = [];
      this.filters.categories.forEach(categoryName => {
        const selectedCategory = this.categories.find(cat => cat.name === categoryName);
        if (selectedCategory) {
          const categoryProducts = this.allProducts.filter(product => 
            product.subcategory?.category_id?._id === selectedCategory._id ||
            product.subcategory?.category_id === selectedCategory._id
          );
          const subcategoryIds = categoryProducts.map(product => product.subcategory);
          allSubcategoryIds = [...allSubcategoryIds, ...subcategoryIds];
        }
      });
      allSubcategoryIds = [...new Set(allSubcategoryIds)];
      filtered = filtered.filter(product => {
        return allSubcategoryIds.includes(product.subcategory);
      });
    }
    
    if (this.filters.brands && this.filters.brands.length) {
      filtered = filtered.filter(product => 
        this.filters.brands!.includes(product.brand)
      );
    }
    
    if (this.filters.tags && this.filters.tags.length) {
      filtered = filtered.filter(product => 
        product.tags?.some(tag => this.filters.tags!.includes(tag))
      );
    }
    
    if (this.filters.minPrice !== undefined) {
      filtered = filtered.filter(product => product.base_price >= this.filters.minPrice!);
    }
    if (this.filters.maxPrice !== undefined) {
      filtered = filtered.filter(product => product.base_price <= this.filters.maxPrice!);
    }
    
    if (this.filters.search) {
      const searchTerm = this.filters.search.toLowerCase();
      filtered = filtered.filter(product => {
        const nameMatch = product.name?.toLowerCase().includes(searchTerm);
        const descMatch = product.description?.toLowerCase().includes(searchTerm);
        return nameMatch || descMatch;
      });
    }
    
    // Apply sorting
    if (this.filters.sortBy) {
      filtered = this.applySorting(filtered, this.filters.sortBy);
    }
    
    this.filteredProducts = filtered;
    this.totalCount = filtered.length;
    this.totalPages = Math.ceil(this.totalCount / this.pageSize);
    this.updateDisplayedProducts();
  }
  
  applySorting(products: Product[], sortBy: string): Product[] {
    const sortedProducts = [...products];
    
    switch (sortBy) {
      case 'price_asc':
        return sortedProducts.sort((a, b) => a.base_price - b.base_price);
      case 'price_desc':
        return sortedProducts.sort((a, b) => b.base_price - a.base_price);
      case 'name_asc':
        return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
      case 'latest':
        return sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      case 'oldest':
        return sortedProducts.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
      default:
        console.log('Unknown sort option:', sortBy);
        return sortedProducts;
    }
  }
  
  updateDisplayedProducts() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.products = this.filteredProducts.slice(startIndex, endIndex);
  }

  fetchCategories() {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data || [];
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }
  

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

  onPriceFilterApplied(range: { from: number; to: number }) {
    this.filters.minPrice = range.from;
    this.filters.maxPrice = range.to;
    this.page = 1;
<<<<<<< HEAD
    this.fetchProducts();
  }

  onCategoriesChange(selected: string[]) {
    this.filters.brands = selected;
    this.page = 1;
    this.fetchProducts();
=======
    this.applyClientSideFilters();
  }

  onCategoriesChange(selected: string[]) {
    this.filters.categories = selected.length ? selected : undefined;
    console.log("Filter categories set to:", this.filters.categories);
    this.page = 1;
    this.applyClientSideFilters();
  }

  onBrandsChange(selected: string[]) {
    this.filters.brands = selected.length ? selected : undefined;
    this.page = 1;
    this.applyClientSideFilters();
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  onAddToCart(product: Product) {
    if (!localStorage.getItem('auth_token')) {
      this.router.navigate(['/login']);
      return;
    }
<<<<<<< HEAD

    // Check if product has stock
=======
    console.log("Cart Product : ",product)
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
    this.fetchProducts();
=======
    this.updateDisplayedProducts();
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  onSearch(searchTerm: string) {
    this.filters.search = searchTerm || undefined;
    this.page = 1;
<<<<<<< HEAD
    this.fetchProducts();
=======
    this.applyClientSideFilters();
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  onSortChange(sortValue: string) {
    this.filters.sortBy = sortValue;
    this.page = 1;
<<<<<<< HEAD
    this.fetchProducts();
  }

  onPageSizeChange(pageSize: number) {
    this.filters.limit = pageSize;
    this.page = 1;
    this.fetchProducts();
=======
    this.applyClientSideFilters();
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.page = 1;
    this.applyClientSideFilters();
  }

  onViewModeChange(mode: 'grid' | 'list') {
    console.log('Products component view mode:', mode);
    this.viewMode = mode;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  onTagsChange(selected: string[]) {
    this.filters.tags = selected.length ? selected : undefined;
    this.page = 1;
<<<<<<< HEAD
    this.fetchProducts();
=======
    this.applyClientSideFilters();
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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

