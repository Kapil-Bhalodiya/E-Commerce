import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, of, shareReplay, tap } from 'rxjs'
import { environment } from '../../environments/environment'
import { Product } from '../models/product.model'
import { API_ENDPOINTS } from '../core/constants/api.constants'
import { APP_CONFIG } from '../core/constants/app.constants'

export interface ProductFilters {
  minPrice?: number
  maxPrice?: number
  brands?: string[]
  tags?: string[]
  categories?: string[]
  subcategory?: string
  search?: string
  sortBy?: string
  limit?: number
}

export interface ProductResponse {
  success: boolean
  data: {
    products: Product[]
    totalCount: number
    currentPage: number
    totalPages: number
  }
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productCache = new Map<string, Observable<Product>>()

  constructor(private http: HttpClient) {}

  fetchProducts(
    page: number = 1,
    limit: number = APP_CONFIG.PAGINATION.DEFAULT_PAGE_SIZE,
    filters: ProductFilters = {}
  ): Observable<ProductResponse> {
    const actualLimit = filters.limit || limit;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', Math.min(actualLimit, APP_CONFIG.PAGINATION.MAX_PAGE_SIZE).toString())

    if (filters.sortBy) {
      params = params.set('sortBy', filters.sortBy);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'limit' && key !== 'sortBy') {
        if (Array.isArray(value) && value.length > 0) {
          params = params.set(key, value.join(','))
        } else if (!Array.isArray(value)) {
          params = params.set(key, value.toString())
        }
      }
    })

    return this.http.get<any>(`${environment.backendApi}${API_ENDPOINTS.PRODUCTS.BASE}`, { params })
  }
  
  fetchAllProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${environment.backendApi}${API_ENDPOINTS.PRODUCTS.BASE}`)
  }

  getProductById(id: string): Observable<Product> {
    if (this.productCache.has(id)) {
      return this.productCache.get(id)!
    }

    const product$ = this.http.get<Product>(`${environment.backendApi}${API_ENDPOINTS.PRODUCTS.BASE}/${id}`)
      .pipe(
        shareReplay(1),
        tap(() => {
          // Cache expires after 5 minutes
          setTimeout(() => this.productCache.delete(id), 5 * 60 * 1000)
        })
      )

    this.productCache.set(id, product$)
    return product$
  }

  searchProducts(query: string, limit: number = 10): Observable<ProductResponse> {
    if (!query.trim()) {
      return of({ success: true, data: { products: [], totalCount: 0, currentPage: 1, totalPages: 0 }, message: '' })
    }

    const params = new HttpParams()
      .set('search', query.trim())
      .set('limit', limit.toString())

    return this.http.get<ProductResponse>(`${environment.backendApi}${API_ENDPOINTS.PRODUCTS.BASE}/search`, { params })
  }
}