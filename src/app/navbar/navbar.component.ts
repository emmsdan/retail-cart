import { Component } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { CartService } from '../services/cart.service';
import { RouterLink } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {ProductService} from '../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  cartItems: CartItem[] = [];
  searchQuery: string = ''

  constructor(public cartService: CartService,
              private productService: ProductService,
              ) {}
  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  handleFilter(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const filter = inputElement.value;
    this.productService.search(filter)
  }
}
