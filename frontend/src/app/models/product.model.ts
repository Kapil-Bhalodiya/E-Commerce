<<<<<<< HEAD
import { Variant } from './productvariant.model';

export interface Product {
  _id: string;
  name: string;
  description: string;
  brand: string;
  subcategory: string;
  base_price: number;
  tags: string[];
  dietary_needs: string[];
  image_urls: string[];
  variant_ids: Variant[];
=======
import { Variant } from './productvariant.model'

export interface Product {
  _id: string
  name: string
  description?: string
  brand: string
  subcategory: any
  base_price: number
  sale_price?: number
  stock?: number
  rating?: number
  review_count?: number
  tags?: string[]
  dietary_needs?: string[]
  image_urls: string[]
  variant_ids?: Variant[]
  category?: string
  sku?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  is_active?: boolean
  createdAt: string
  updatedAt: string
}

export interface ProductListResponse {
  success: boolean
  data: {
    products: Product[]
    totalCount: number
    currentPage: number
    totalPages: number
  }
  message: string
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
}