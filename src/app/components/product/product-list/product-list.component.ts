import { Component } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CartService } from '../../../services/cart.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
})
export class ProductListComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastService.showMessage(`${product.name} added to cart!`);
  }
}
