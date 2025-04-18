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
}