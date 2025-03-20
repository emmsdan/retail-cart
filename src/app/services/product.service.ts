import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { PRODUCTS } from '../data/products';
import {BehaviorSubject} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private allProducts: Product[] = JSON.parse(localStorage.getItem('products') || '[]');
  private products: Product[]
  private productsSubject = new BehaviorSubject<Product[]>(this.allProducts);
  products$ = this.productsSubject.asObservable();

  constructor() {
    if (this.allProducts.length < 12){
      this.allProducts = PRODUCTS
      this.productsSubject.next(this.allProducts)
    }
    this.products = this.allProducts
  }

  getProducts(): Product[] {
    if (this.products.length === 0) {
      this.products = PRODUCTS;
      this.allProducts = PRODUCTS;
      this.updateServerProduct()
    }
    return this.products;
  }

  addProduct(product: Product): void {
    product.id = this.allProducts.length + 1;
    this.allProducts.unshift(product);
    this.updateServerProduct()
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.allProducts.findIndex((p) => p.id === updatedProduct.id);
    if (index !== -1) {
      this.allProducts[index] = updatedProduct;
      this.updateServerProduct()
    }
  }

  deleteProduct(productId: number): void {
    this.allProducts = this.allProducts.filter((p) => p.id !== productId);
    this.updateServerProduct()
  }

  updateServerProduct(){
    localStorage.setItem('products', JSON.stringify(this.allProducts))
    this.products = this.allProducts
    this.productsSubject.next([...this.products])
  }


  search(search: string): void {
    this.products = this.allProducts.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
    this.productsSubject.next([...this.products])
  }
}
