import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products: Product[] = [...PRODUCTS];

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    product.id = this.products.length + 1;
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(productId: number): void {
    this.products = this.products.filter((p) => p.id !== productId);
  }
}
