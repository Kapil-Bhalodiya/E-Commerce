<<<<<<< HEAD
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment,STRIPE_PK } from '../../../../environments/environment';
import { loadStripe, Stripe, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentService } from '../../../services/payment.service';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
import { ToastComponent } from '../../../shared/components/toast/toast.component';

@Component({
  selector: 'app-payment-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent, ToastComponent],
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.scss']
})
export class PaymentStepComponent implements OnInit {
=======
import { Component, Input, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { STRIPE_PK } from '../../../../environments/environment';
import { loadStripe, Stripe, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentService } from '../../../services/payment.service';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
@Component({
  selector: 'app-payment-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.scss']
})
export class PaymentStepComponent implements OnInit, OnDestroy {
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  private fb = inject(FormBuilder);
  
  @Input() formGroup!: FormGroup;
  @Input() globalFormGroup!: FormGroup;

  loading = signal(true);
  paymentError = signal<string | null>(null);
  paymentSuccess = signal(false);
  
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  paymentElement: any = null;
  clientSecret: string | null = null;
<<<<<<< HEAD
=======
  private isInitialized = false;
  private static paymentIntentCreated = false;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

  constructor(
    private paymentService: PaymentService
  ){}

  async ngOnInit() {
<<<<<<< HEAD
    await this.loadStripe();
  }

  async loadStripe() {
=======
    if (!this.isInitialized) {
      this.isInitialized = true;
      await this.loadStripe();
    }
  }

  async loadStripe() {
    if (this.stripe) {
      return; // Already loaded
    }
    
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    this.loading.set(true)
    try {
      this.stripe = await loadStripe(STRIPE_PK);
      
      if (!this.stripe) {
        throw new Error('Failed to load Stripe');
      }
      
      // After loading Stripe, create the payment intent
      await this.createPaymentIntentAndInitializeElements();
    } catch (error) {
      console.error('Error loading Stripe:', error);
      this.paymentError.set('Failed to load payment system. Please try again later.');
    }
  }

  async createPaymentIntentAndInitializeElements() {
<<<<<<< HEAD
    try {
      this.loading.set(true);
      
      // Get the amount from the form
      const itemsString = localStorage.getItem('cart');
      const items = itemsString ? JSON.parse(itemsString) : [];

      // Now items is an array, so you can safely use map
      const amount = items.map((element: any) => element.price)
                         .reduce((acc: number, val: number) => acc + val, 0);
      console.log(amount)
      
      // Create payment intent on your backend
      const response = await this.paymentService.createPaymentIntent(amount).subscribe({
        next: async (res: any) => {
          console.log("res: ",res)
          this.loading.set(false);
          this.clientSecret = res;
          console.log("formGrp :",this.formGroup)
          this.formGroup.get('stripePaymentIntentId')?.setValue(res);
          console.log("formGrp :",this.formGroup)
          await this.initializeStripeElements();
        },
        error: (err: any) => console.error("Invalid response from server :",err)
      })
      console.log("response : ",response)
      if (!response) {
        throw new Error('Invalid response from server');
      }
      
      // Now initialize Elements with the client secret
    } catch (error) {
      this.loading.set(false);
      console.error('Error creating payment intent:', error);
      this.paymentError.set('Failed to prepare payment. Please try again later.');
    } finally {
=======
    if (this.clientSecret || PaymentStepComponent.paymentIntentCreated) {
      return;
    }
    
    PaymentStepComponent.paymentIntentCreated = true;
    
    try {
      this.loading.set(true);
      
      const itemsString = localStorage.getItem('cart');
      const items = itemsString ? JSON.parse(itemsString) : [];

      const amount = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
      
      const res = await firstValueFrom(this.paymentService.createPaymentIntent(amount));
      
      this.clientSecret = res;
      this.formGroup.get('stripePaymentIntentId')?.setValue(res);
      
      await this.initializeStripeElements();
      this.loading.set(false);
      
    } catch (error) {
      PaymentStepComponent.paymentIntentCreated = false;
      this.loading.set(false);
      console.error('Error creating payment intent:', error);
      this.paymentError.set('Failed to prepare payment. Please try again later.');
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    }
  }

  async initializeStripeElements() {
    console.log(this.stripe)
    console.log(this.clientSecret)
    if (!this.stripe || !this.clientSecret) {
      this.paymentError.set('Payment system not properly initialized');
      return;
    }
    
    try {
      // Set up Stripe Elements with the client secret
      const options: StripeElementsOptions = {
        clientSecret: this.clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#0d6efd',
            colorBackground: '#ffffff',
            colorText: '#30313d',
            colorDanger: '#df1b41',
            fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
            spacingUnit: '4px',
            borderRadius: '4px'
          }
        }
      };
      
      this.elements = this.stripe.elements(options);
      
      // Create and mount the Payment Element
      this.paymentElement = this.elements.create('payment', {
        defaultValues: {
          billingDetails: {
            name: this.formGroup.get('name')?.value || '',
            email: this.formGroup.get('email')?.value || ''
          }
        }
        
      });
      this.paymentElement.mount('#payment-element');
    } catch (error) {
      console.error('Error initializing payment element:', error);
      this.paymentError.set('Failed to initialize payment form. Please try again later.');
    }
  }

  async onAmountChange() {
    // When amount changes, we need a new payment intent with the new amount
    // First unmount the payment element if it exists
    if (this.paymentElement) {
      this.paymentElement.unmount();
      this.paymentElement = null;
    }
    
    // Create a new payment intent and reinitialize elements
    await this.createPaymentIntentAndInitializeElements();
  }

  // getSelectedAmountLabel(): number {
  //   return this.totalAmount;
  // }

  async handleSubmit() {
    if (!this.stripe || !this.elements || !this.formGroup.valid) {
      return;
    }
    
    try {
      this.loading.set(true);
      this.paymentError.set(null);
      
      // Update billing details in the payment element
      // this.paymentElement.update({
      //   defaultValues: {
      //     billingDetails: {
      //       name: this.formGroup.get('name')?.value,
      //       email: this.formGroup.get('email')?.value
      //     }
      //   }
      // });
      
      // Submit the payment element form
      const { error: submitError } = await this.elements.submit();
      
      if (submitError) {
        throw new Error(submitError.message);
      }
      
      // Get form values
      const { name, email } = this.formGroup.value;
      
      // Confirm payment with the client secret that's already set
      const { error } = await this.stripe.confirmPayment({
        elements: this.elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-confirmation`,
          receipt_email: email,
          payment_method_data: {
            billing_details: {
              name,
              email
            }
          }
        },
        redirect: 'if_required'
      });
      
      if (error) {
        throw new Error(error.message || 'An unknown error occurred');
      } else {
        // Payment succeeded
        this.paymentSuccess.set(true);
        // Update form with payment success
        this.formGroup.get('paymentCompleted')?.setValue(true);
        alert("payment successful");
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      this.paymentError.set(error.message || 'An error occurred during payment processing');
    } finally {
      this.loading.set(false);
    }
  }
<<<<<<< HEAD
=======

  ngOnDestroy() {
    if (this.paymentElement) {
      this.paymentElement.unmount();
    }
  }
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
}
