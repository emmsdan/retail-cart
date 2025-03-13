import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementComponent } from './product-management.component';
import { ActivatedRouteProviderMock } from '../../../../shared/mock/app-router';

describe('ProductManagementComponent', () => {
  let component: ProductManagementComponent;
  let fixture: ComponentFixture<ProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagementComponent],
      providers: [ActivatedRouteProviderMock],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
