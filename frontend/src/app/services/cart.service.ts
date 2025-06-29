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
