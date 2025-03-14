import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() showBuyButton: boolean = true;
  @Output() onAddToCart = new EventEmitter<Product>();
  get dynamicStyles() {
    return {
      '--product-name': `"${this.product?.name || 'Default'}"`,
    };
  }
  handleAddToCart(): void {
    this.onAddToCart.emit(this.product);
  }
}
