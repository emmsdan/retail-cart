import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../services/product.service';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss',
})
export class ProductManagementComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0 };
  editingProduct: Product | null = null;
  productForm = new FormGroup({
    image: new FormControl(''),
    name: new FormControl('', Validators.required),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
  });
  showProduct: boolean = false;

  constructor(
    private productService: ProductService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  toggleOpenProduct(): void {
    this.showProduct = !this.showProduct;
  }

  addProduct(): void {
    this.productService.addProduct(this.newProduct);
    this.newProduct = { id: 0, name: '', price: 0 };
    this.products = this.productService.getProducts();
    this.toastService.showMessage('New Product added.');
  }

  updateProduct(): void {
    if (this.editingProduct) {
      this.productService.updateProduct(this.editingProduct);
      this.editingProduct = null;
      this.products = this.productService.getProducts();
      this.toastService.showMessage('Product updated.');
    }
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
  }

  onSubmit(): void {
    if (this.editingProduct) {
      const updatedProduct = {
        ...this.editingProduct,
        ...this.productForm.value,
      } as Product;
      this.productService.updateProduct(updatedProduct);
      this.editingProduct = null;
    } else {
      const newProduct: Product = {
        id: Date.now(), // Unique ID
        name: this.productForm.value.name!,
        price: this.productForm.value.price!,
      };
      this.productService.addProduct(newProduct);
    }
    this.productForm.reset();
    this.loadProducts();
  }

  editProduct(product: Product): void {
    this.editingProduct = product;
    this.productForm.setValue({
      name: product.name,
      price: product.price,
      image: product.image || '',
    });
    this.toggleOpenProduct();

  }

  deleteProduct(productId: number): void {
    const del = confirm('Are you sure you want to delete this product?');
    if (del) {
      this.productService.deleteProduct(productId);
      this.loadProducts();
      this.toastService.showMessage('Product deleted.');
    }
  }
}
