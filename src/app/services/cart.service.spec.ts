import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

describe('CartService', () => {
  let service: CartService;
  let product1: Product;
  let product2: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    localStorage.clear();

    product1 = { id: 1, name: 'Product 1', price: 100 };
    product2 = { id: 2, name: 'Product 2', price: 200 };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    service.addToCart(product1);
    expect(service.getCartItems().length).toBe(1);
    expect(service.getCartItems()[0].product).toEqual(product1);
  });

  it('should increase quantity when adding the same product again', () => {
    service.addToCart(product1);
    service.addToCart(product1);
    expect(service.getCartItems()[0].quantity).toBe(3);
  });

  it('should remove a product from the cart', () => {
    service.addToCart(product1);
    service.removeFromCart(product1.id);
    expect(service.getCartItems().length).toBe(0);
  });

  it('should update the quantity of a product', () => {
    service.addToCart(product1);
    service.updateQuantity(product1.id, 5);
    expect(service.getCartItems()[0].quantity).toBe(5);
  });

  it('should not remove product if quantity is set to 0', () => {
    service.addToCart(product1);
    service.addToCart(product2);
    service.updateQuantity(product1.id, 0);
    const total = service.getGrandTotal()
    const cartSize = service.getCartItems().length
    service.removeFromCart(product2.id);
    expect(cartSize).toBe(2);
    expect(product2.price).toEqual(total);
    expect(total).toBe(200);
  });

  it('should calculate grand total correctly', () => {
    service.addToCart(product1);
    service.addToCart(product2);
    expect(service.getGrandTotal()).toBe(300);
  });

  it('should apply discount correctly with SAVE10', () => {
    service.addToCart(product1);
    service.addToCart(product2);
    const message = service.applyDiscount('SAVE10');
    expect(message).toContain('Discount applied: -$60.00');
    expect(service.getGrandTotal()).toBe(540);
  });

  it('should apply discount correctly with SAVE5', () => {
    service.addToCart(product1);
    const message = service.applyDiscount('SAVE5');
    expect(message).toContain('Discount applied: -$5.00');
    expect(service.getGrandTotal()).toBe(695);
  });

  it('should return invalid discount message for unknown code', () => {
    const message = service.applyDiscount('INVALID');
    expect(message).toBe('Invalid discount code');
    expect(service.getDiscountAmount()).toBe(0);
  });

  it('should persist cart items to local storage', () => {
    service.addToCart(product1);
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(storedCart.length).toBe(1);
    expect(storedCart[0].product.id).toBe(product1.id);
  });
});
