import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import PaystackPop from '@paystack/inline-js';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
  @Input() cartItems: any[] = [];
  @Input() total: number = 0;

  public showPayForm=false

  checkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  public paystack = new PaystackPop();
  
  handlePayment(){
    this.paystack.newTransaction({
      key: environment.publicPaystackKey,
      email: this.checkoutForm.value.email!,
      amount: this.total * 100
    });
  }

  togglePayForm(){
    this.showPayForm = !this.showPayForm
  }
}
