import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../../models/product.model';
import { By } from '@angular/platform-browser';
import { ActivatedRouteProviderMock } from '../../../../shared/mock/app-router';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    image: 'assets/test-product.png',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCardComponent],
      providers: [ActivatedRouteProviderMock],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product name and price correctly', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    const nameElement = fixture.debugElement.query(By.css('h3'));
    const priceElement = fixture.debugElement.query(By.css('.price'));

    expect(nameElement.nativeElement.textContent).toContain('Test Product');
    expect(priceElement.nativeElement.textContent).toContain('99.99');
  });

  it('should emit the buy event when Buy Now button is clicked', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    jest.spyOn(component.buy, 'emit');

    const button = fixture.debugElement.query(By.css('.buy'));
    button.nativeElement.click();

    expect(component.buy.emit).toHaveBeenCalledWith(mockProduct);
  });

  it('should apply dynamic styles based on the product name', () => {
    component.product = mockProduct;
    fixture.detectChanges();

    expect(component.dynamicStyles['--product-name']).toBe('"Test Product"');
  });

  it('should hide Buy Now button when showBuyButton is false', () => {
    component.product = mockProduct;
    component.showBuyButton = false;
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('.buy'));
    expect(button).toBeNull();
  });
});
