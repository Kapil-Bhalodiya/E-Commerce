import { Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartProducts = signal<Product[]>([
    {
      "id": 1,
      "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price": 109.95,
      "description": "Your perfect pack for everyday use and travel. A minimalist laptop backpack with a style all its own.",
      "category": "men's clothing",
      "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
      "rating": 3.9
    },
    {
      "id": 2,
      "title": "Mens Casual Premium Slim Fit T-Shirts",
      "price": 22.3,
      "description": "Slim fit, lightweight, and comfortable. Suitable for both daily use and casual outings.",
      "category": "men's clothing",
      "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
      "rating": 4.1
    },
  ]);

  addToCart(product: Product){
    this.cartProducts.set([...this.cartProducts(), product])
  }

  removeFromCart(id: number){
    this.cartProducts.set(this.cartProducts().filter((product) => product.id !== id))
  }

  constructor() { }
}
