export interface Product { 
    id: number,
    title: string,
    description: string,
    category: string,
    image: string,
    price: number,
    stock?: number,
    rating?: number
  }