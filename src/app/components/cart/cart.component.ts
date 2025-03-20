import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { CheckoutComponent } from '../checkout/checkout.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, CheckoutComponent],
})
export class CartComponent {
  cartItems: CartItem[] = [];
  discountCode: string = '';
  grandTotal: number = 0;
  discountMessage: string = '';
  subtotal: number = 0;
  discount: number = 0;
  total: number = 0;

  constructor(
    public cartService: CartService,
    private toastService: ToastService,
  ) {
    this.cartItems = this.cartService.getCartItems();
    this.grandTotal = this.cartService.getGrandTotal();
  }

  ngOnInit() {
   this.cartService.cart$.subscribe((cartItems) => {
      this.cartItems = cartItems;
      this.updateTotals();
    });
  }

  updateTotals() {
    this.subtotal = this.cartService
      .getCartItems()
      .reduce((total, item) => total + item.product.price * item.quantity, 0);
    this.discount = this.cartService.getDiscountAmount();
    this.total = this.cartService.getGrandTotal();
  }

  applyDiscount() {
    this.discountMessage = this.cartService.applyDiscount(this.discountCode);
    this.updateTotals();
    this.toastService.showMessage(this.discountMessage);
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotals();
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
    this.cartItems = this.cartService.getCartItems();
    this.updateTotals();
    this.toastService.showMessage(`You removed item from cart!`);
  }

  getTotal(): number {
    return this.cartService.getGrandTotal();
  }

  clearCart(): void {
    this.cartService.clearCart()
  }
}
