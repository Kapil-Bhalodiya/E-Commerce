export interface ProductFilters {
  minPrice?: number;
  maxPrice?: number;
  brands?: string[];
<<<<<<< HEAD
  occasion?: string[];
  search?: string;
  tags?: string[];
=======
  search?: string;
  tags?: string[];
  category?: string[];
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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