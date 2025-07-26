<<<<<<< HEAD
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cartItem.model';
@Injectable({
    providedIn: 'root'
})
export class CartService {
    private key: string = 'cartItems';
    private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
    cartItems$ = this.cartItemsSubject.asObservable();

    constructor() { }

    private getCartFromStorage(): CartItem[] {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    }

    private updateCartStorage(cartItems: CartItem[]) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        this.cartItemsSubject.next(cartItems);
    }

    addToCart(product: CartItem) {
        const currentCart = this.getCartFromStorage();
        const existingItem = currentCart.find(item => item.productId === product.productId);

        if (existingItem) {
            existingItem.quantity += product.quantity;
        } else {
            currentCart.push(product);
        }

        this.updateCartStorage(currentCart);
    }

    removeFromCart(productId: string) {
        const updatedCart = this.getCartFromStorage().filter(item => item.productId !== productId);
        this.updateCartStorage(updatedCart);
    }

    clearCart() {
        localStorage.removeItem('cart');
        this.cartItemsSubject.next([]);
    }

    getCartItems(): CartItem[] {
        return this.getCartFromStorage();
    }

    getCartItems$() {
        return this.cartItemsSubject.asObservable();
    }

    getSubtotal(): number {
        const cartItems = this.getCartFromStorage();
        return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
}
// import { Injectable, signal } from '@angular/core';
// import { Product } from '../models/product.model';

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   cartProducts = signal<Product[]>([
//     {
//       "id": 1,
//       "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//       "price": 109.95,
//       "description": "Your perfect pack for everyday use and travel. A minimalist laptop backpack with a style all its own.",
//       "category": "men's clothing",
//       "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
//       "rating": 3.9
//     },
//     {
//       "id": 2,
//       "title": "Mens Casual Premium Slim Fit T-Shirts",
//       "price": 22.3,
//       "description": "Slim fit, lightweight, and comfortable. Suitable for both daily use and casual outings.",
//       "category": "men's clothing",
//       "image": "https://img.etimg.com/thumb/msid-88750013,width-300,height-225,imgsize-78670,resizemode-75/fiwbyyxvkaig1mv.jpg",
//       "rating": 4.1
//     },
//   ]);

//   addToCart(product: Product){
//     this.cartProducts.set([...this.cartProducts(), product])
//   }

//   removeFromCart(id: number){
//     this.cartProducts.set(this.cartProducts().filter((product) => product.id !== id))
//   }

//   constructor() { }
// }
=======
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable } from 'rxjs'
import { CartItem } from '../models/cartItem.model'
import { STORAGE_KEYS } from '../core/constants/api.constants'

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromStorage())
  public cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable()

  private getCartFromStorage(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEYS.CART)
      return storedCart ? JSON.parse(storedCart) : []
    } catch {
      return []
    }
  }

  private updateCartStorage(cartItems: CartItem[]): void {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems))
    this.cartItemsSubject.next(cartItems)
  }

  addToCart(product: CartItem): void {
    const currentCart = this.getCartFromStorage()
    const existingItemIndex = currentCart.findIndex(item => item.productId === product.productId)

    if (existingItemIndex > -1) {
      currentCart[existingItemIndex].quantity += product.quantity
    } else {
      currentCart.push({ ...product })
    }

    this.updateCartStorage(currentCart)
  }

  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId)
      return
    }

    const currentCart = this.getCartFromStorage()
    const itemIndex = currentCart.findIndex(item => item.productId === productId)
    
    if (itemIndex > -1) {
      currentCart[itemIndex].quantity = quantity
      this.updateCartStorage(currentCart)
    }
  }

  removeFromCart(productId: string): void {
    const updatedCart = this.getCartFromStorage().filter(item => item.productId !== productId)
    this.updateCartStorage(updatedCart)
  }

  clearCart(): void {
    localStorage.removeItem(STORAGE_KEYS.CART)
    this.cartItemsSubject.next([])
  }

  getCartItems(): CartItem[] {
    return this.getCartFromStorage()
  }

  getCartItems$(): Observable<CartItem[]> {
    return this.cartItems$
  }

  getSubtotal(): number {
    return this.getCartFromStorage().reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  getItemCount(): number {
    return this.getCartFromStorage().reduce((count, item) => count + item.quantity, 0)
  }
}
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
