import { Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { ProductManagementComponent } from './components/product/product-management/product-management.component';

export const routes: Routes =  [
    { path: 'products', component: ProductListComponent },
    { path: 'cart', component: CartComponent },
    { path: 'admin', component: ProductManagementComponent },
    { path: '', redirectTo: '/products', pathMatch: 'full' }
  ];