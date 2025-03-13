import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cartItems);
  cart$ = this.cartSubject.asObservable();
  private discountAmount: number = 0;

  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(product: Product) {
    const item = this.cartItems.find(i => i.product.id === product.id);
    if (item) {
      item.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.saveCart();
    this.cartSubject.next([...this.cartItems]);
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.saveCart();
    this.cartSubject.next([...this.cartItems]);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(i => i.product.id === productId);
    if (item) {
      item.quantity = quantity > 0 ? quantity : 0;
      this.cartItems = this.cartItems.filter(i => i.quantity > 0);
    }
    this.saveCart();
    this.cartSubject.next([...this.cartItems]);
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  getGrandTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0) - this.discountAmount;
  }

  applyDiscount(code: string): string {
    let discount = 0;
    if (code === 'SAVE10') {
      discount = this.getCartItems().reduce((total, item) => total + item.product.price * item.quantity, 0) * 0.10;
    } else if (code === 'SAVE5') {
      discount = 5;
    } else {
      this.discountAmount = 0;
      return 'Invalid discount code';
    }
    this.discountAmount = discount;
    return `Discount applied: -$${discount.toFixed(2)}`;
  }

  getDiscountAmount(): number {
    return this.discountAmount;
  }
  
  
}