import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product-list/product-list.component';

export const routes: Routes =  [
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' }
  ];