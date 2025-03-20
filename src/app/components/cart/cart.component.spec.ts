import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../services/cart.service';
import { ActivatedRouteProviderMock } from '../../../shared/mock/app-router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  let cartService: CartService;

  beforeEach(async () => {
    const cartServiceMock = {
      addToCart: jest.fn(),
      applyDiscount: jest.fn(),
      updateQuantity: jest.fn(),
      removeFromCart: jest.fn(),
      getCartItems: jest.fn().mockReturnValue([]),
      getGrandTotal: jest.fn().mockReturnValue(100),
      getDiscountAmount: jest.fn().mockReturnValue(0),
      getTotal: jest.fn().mockReturnValue(1000),
    };

    TestBed.configureTestingModule({
      imports: [CartComponent, NoopAnimationsModule],
      providers: [
        ActivatedRouteProviderMock,
        { provide: CartService, useValue: cartServiceMock },
      ],
    });

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService);
  });

  it('should apply discount and update totals', () => {
    const discountMessage = 'Discount applied: -$10.00';
    component.discountCode = 'SAVE10';
    jest.spyOn(cartService, 'applyDiscount').mockReturnValue(discountMessage);
    jest.spyOn(component, 'updateTotals');

    component.applyDiscount();

    expect(cartService.applyDiscount).toHaveBeenCalledWith('SAVE10');
    expect(component.discountMessage).toBe(discountMessage);
    expect(component.updateTotals).toHaveBeenCalled();
  });

  it('should update quantity and refresh cart items', () => {
    const productId = 1;
    jest.spyOn(cartService, 'updateQuantity');
    jest
      .spyOn(cartService, 'getCartItems')
      .mockReturnValue([
        { product: { id: 1, name: 'Product A', price: 100 }, quantity: 2, id: 1},
      ]);
    jest.spyOn(component, 'updateTotals');

    component.updateQuantity(productId, 2);

    expect(cartService.updateQuantity).toHaveBeenCalledWith(productId, 2);
    expect(cartService.getCartItems).toHaveBeenCalled();
    expect(component.cartItems.length).toBe(1);
    expect(component.updateTotals).toHaveBeenCalled();
  });

  it('should remove item from cart and update totals', () => {
    const productId = 1;
    jest.spyOn(cartService, 'removeFromCart');
    jest.spyOn(cartService, 'getCartItems').mockReturnValue([]);
    jest.spyOn(component, 'updateTotals');

    component.removeFromCart(productId);

    expect(cartService.removeFromCart).toHaveBeenCalledWith(productId);
    expect(cartService.getCartItems).toHaveBeenCalled();
    expect(component.cartItems.length).toBe(0);
    expect(component.updateTotals).toHaveBeenCalled();
  });

  it('should get the total from CartService', () => {
    jest.spyOn(cartService, 'getGrandTotal').mockReturnValue(250);
    const total = component.getTotal();
    expect(cartService.getGrandTotal).toHaveBeenCalled();
    expect(total).toBe(250);
  });

  it('should update total when discount is applied', () => {
    jest
      .spyOn(cartService, 'applyDiscount')
      .mockReturnValue('Discount applied: -$50.00');
    jest.spyOn(cartService, 'getGrandTotal').mockReturnValue(150);

    component.applyDiscount();

    expect(cartService.applyDiscount).toHaveBeenCalled();
    expect(cartService.getGrandTotal).toHaveBeenCalled();
    expect(component.total).toBe(150);
  });
});
