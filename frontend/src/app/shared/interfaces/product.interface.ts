export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
  search?: string;
  tags?: string[];
  category?: string[];
  sortBy?: string;
  page?: number;
  limit?: number;
}

export interface ProductListConfig {
  showFilters: boolean;
  showSearch: boolean;
  showSorting: boolean;
  showPagination: boolean;
  itemsPerPage: number;
  gridColumns: number;
}

export interface FilterOption {
  label: string;
  value: string;
  checked?: boolean;
}

export interface SortOption {
  label: string;
  id: string;
  value: string;
}