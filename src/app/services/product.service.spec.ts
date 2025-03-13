import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { ActivatedRouteProviderMock } from '../../shared/mock/app-router';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ActivatedRouteProviderMock],
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
