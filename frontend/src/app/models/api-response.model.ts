export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message: string
  errors?: string[]
}

export interface PaginatedResponse<T> {
  success: boolean
  data: {
    items: T[]
    totalCount: number
    currentPage: number
    totalPages: number
    hasNext: boolean
    hasPrevious: boolean
  }
  message: string
}