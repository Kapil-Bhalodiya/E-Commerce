import { FilterOption, SortOption } from '../interfaces/product.interface';

export const PRODUCT_DATA = {
  sortOptions: [
    { label: 'Sort by Latest', id: 'latest-sort', value: 'latest' },
    { label: 'Sort by Rating', id: 'rating-sort', value: 'rating' },
    { label: 'Price: Low to High', id: 'price-asc', value: 'price_asc' },
    { label: 'Price: High to Low', id: 'price-desc', value: 'price_desc' },
    { label: 'Alphabetical A-Z', id: 'name-asc', value: 'name_asc' },
    { label: 'Alphabetical Z-A', id: 'name-desc', value: 'name_desc' }
  ] as SortOption[],

  pageSizeOptions: [
    { label: '4', id: '4', value: '4' },
    { label: '8', id: '8', value: '8' },
    { label: '12', id: '12', value: '12' },
    { label: '16', id: '16', value: '16' }
  ] as SortOption[],

  occasionFilters: [
    { label: 'Casual Wear', value: 'casual', checked: false },
    { label: 'Party Wear', value: 'party', checked: false },
    { label: 'Formal Wear', value: 'formal', checked: false },
    { label: 'Sports Wear', value: 'sports', checked: false }
  ] as FilterOption[],

  brandFilters: [
    { label: 'uptownie', value: 'uptownie', checked: false }
  ] as FilterOption[],

  tagFilters: [
    { label: 'Cotton', value: 'Cotton', checked: false },
    { label: 'Print', value: 'Print', checked: false },
    { label: 'Embellished', value: 'Embellished', checked: false },
    { label: 'Sequinned', value: 'Sequinned', checked: false }
  ] as FilterOption[]
};