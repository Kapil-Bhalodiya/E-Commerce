import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { Product } from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient
  ) { }

  fetchProducts(
    page: number = 1,
    limit: number = 2,
    filters: { minPrice?: number; maxPrice?: number; brands?: string[]; occasions?: string[] } = {}
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
      params = params.set('minPrice', filters.minPrice.toString());
      params = params.set('maxPrice', filters.maxPrice.toString());
    }
    if (filters.brands && filters.brands.length) {
      params = params.set('brands', filters.brands.join(','));
    }
    if (filters.occasions && filters.occasions.length) {
      params = params.set('occasions', filters.occasions.join(','));
    }

    return this.http.get<any>(`${environment.backendApi}/products`, { params });
  }
  
  fetchAllProducts(): Observable<any>{
    return this.http.get<any>(`${environment.backendApi}/products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${environment.backendApi}/products/${id}`);
  }
}