import { Variant } from './productvariant.model'

export interface Product {
  _id: string
  name: string
<<<<<<< HEAD
  description: string
  brand: string
  subcategory: string
=======
  description?: string
  brand: string
  subcategory: any
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  base_price: number
  sale_price?: number
  stock?: number
  rating?: number
  review_count?: number
<<<<<<< HEAD
  tags: string[]
  dietary_needs: string[]
  image_urls: string[]
  variant_ids: Variant[]
=======
  tags?: string[]
  dietary_needs?: string[]
  image_urls: string[]
  variant_ids?: Variant[]
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  category?: string
  sku?: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  is_active?: boolean
<<<<<<< HEAD
  created_at?: string
  updated_at?: string
=======
  createdAt: string
  updatedAt: string
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
}