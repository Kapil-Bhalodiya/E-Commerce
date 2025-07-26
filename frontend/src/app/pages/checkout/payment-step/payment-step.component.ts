<<<<<<< HEAD
import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment,STRIPE_PK } from '../../../../environments/environment';
import { loadStripe, Stripe, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentService } from '../../../services/payment.service';
import { SpinnerComponent } from "../../../compoments/spinner/spinner.component";

=======
import { Component, Input, OnInit, OnDestroy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { STRIPE_PK } from '../../../../environments/environment';
import { loadStripe, Stripe, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
import { PaymentService } from '../../../services/payment.service';
import { SpinnerComponent } from "../../../components/spinner/spinner.component";
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
@Component({
  selector: 'app-payment-step',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './payment-step.component.html',
  styleUrls: ['./payment-step.component.scss']
})
<<<<<<< HEAD
export class PaymentStepComponent implements OnInit {
=======
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
<<<<<<< HEAD
=======
        // Update form with payment success
        this.formGroup.get('paymentCompleted')?.setValue(true);
        alert("payment successful");
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      this.paymentError.set(error.message || 'An error occurred during payment processing');
    } finally {
      this.loading.set(false);
    }
  }
<<<<<<< HEAD
}

//   // export class PaymentStepComponent implements FormStepComponent, OnInit, OnDestroy {
//   //   @Input({ required: true }) formGroup!: FormGroup;
//   //   @Input({ required: true }) globalFormGroup!: FormGroup;
//   //   @Input() data: any = {}; // Relaxed type to handle { cartItems: [] }
  
//   //   @ViewChild(StripeCardComponent) cardElement!: StripeCardComponent;
  
//   //   paymentMethods: PaymentOption[] = [
//   //     { value: 'card', label: 'Credit/Debit Card' },
//   //     { value: 'applePay', label: 'Apple Pay' },
//   //     { value: 'googlePay', label: 'Google Pay' },
//   //     { value: 'paypal', label: 'PayPal' },
//   //     { value: 'cod', label: 'Cash on Delivery' }
//   //   ];
  
//   //   cardOptions = {
//   //     style: {
//   //       base: {
//   //         fontSize: '16px',
//   //         color: '#32325d',
//   //         '::placeholder': { color: '#aab7c4' }
//   //       },
//   //       invalid: { color: '#fa755a' }
//   //     }
//   //   };
  
//   //   elementsOptions: StripeElementsOptions = {
//   //     locale: 'en',
//   //     clientSecret: ''
//   //   };
  
//   //   paymentRequestOptions: StripePaymentRequestButtonElementOptions | null = null;
  
//   //   isLoading = false;
//   //   errorMessage: string | null = null;
//   //   showPaymentRequestButton = false;
  
//   //   private destroy$ = new Subject<void>();
//   //   private stripe!: Stripe;
//   //   private fb = inject(FormBuilder);
//   //   public stripeService = inject(StripeService);
//   //   private paymentService = inject(PaymentService);
//   //   private paymentData: PaymentData | null = null;
  
//   //   ngOnInit(): void {
//   //     console.log('Input data:', this.data);
//   //     console.log('globalFormGroup:', this.globalFormGroup.value);
//   //     this.initializeForm();
//   //     this.initializePaymentData();
      
//   //     if (!this.paymentData || !this.isValidPaymentData(this.paymentData)) {
//   //       this.errorMessage = 'Cannot proceed with payment: Invalid or empty order details. Please review your cart or previous steps.';
//   //       console.error('Invalid payment data:', this.paymentData);
//   //       return;
//   //     }
  
//   //     this.setupStripe();
//   //   }
  
//   //   private initializePaymentData(): void {
//   //     const cartItemsJson = localStorage.getItem('cart');
//   //     const cartItems: CartItem[] = cartItemsJson ? JSON.parse(cartItemsJson) : [];
//   //     const deliveryAddressId: string = this.globalFormGroup.get('deliveryForm.addressId')?.value || '';
//   //     const amount = cartItems.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 0), 0);
      
//   //     this.paymentData = {
//   //       deliveryAddressId,
//   //       amount: amount > 0 ? amount + 10 : 0 // Assume $10 shipping cost
//   //     };
//   //     console.log('Derived paymentData:', this.paymentData);
//   //   }
  
//   //   private isValidPaymentData(data: PaymentData): boolean {
//   //     return !!data && typeof data.deliveryAddressId === 'string' && data.deliveryAddressId !== '' && typeof data.amount === 'number' && data.amount > 0;
//   //   }
  
//   //   private initializeForm(): void {
//   //     if (!this.formGroup.get('method')) {
//   //       this.formGroup.addControl('method', this.fb.control('card', [Validators.required]));
//   //       this.formGroup.addControl('provider', this.fb.control('Stripe'));
//   //       this.formGroup.addControl('transactionId', this.fb.control(''));
//   //       this.formGroup.addControl('saveCard', this.fb.control(false));
//   //     }
//   //   }
  
//   //   private async setupStripe(): Promise<void> {
//   //     try {
//   //       this.stripe = this.stripeService.stripe as unknown as Stripe;
//   //       if (!this.stripe) {
//   //         throw new Error('Stripe not initialized. Verify NgxStripeModule configuration with a valid publishable key.');
//   //       }
//   //       if (!this.paymentData) {
//   //         throw new Error('Payment data not initialized');
//   //       }
    
//   //       const response = await lastValueFrom(this.paymentService.createPaymentIntent(this.paymentData.amount));
//   //       console.log('createPaymentIntent response:', response);
    
//   //       if (!response || typeof response !== 'string' || !response.startsWith('pi_') || !response.includes('_secret_')) {
//   //         throw new Error('Invalid client secret received from server: ' + JSON.stringify(response));
//   //       }
    
//   //       this.elementsOptions = {
//   //         clientSecret: response,
//   //         locale: 'en'
//   //       };
    
//   //       // Initialize Stripe Elements with the client secret
//   //       const elements = this.stripe.elements(this.elementsOptions);
//   //       const cardElement = elements.create('card');
//   //       cardElement.mount('#card-element');
    
//   //       this.setupPaymentRequest();
//   //     } catch (error: any) {
//   //       let errorMessage = 'Failed to initialize payment. Please try again later.';
//   //       if (error.status === 0) {
//   //         errorMessage = 'Cannot connect to payment server. Check if the backend is running and CORS is configured.';
//   //       } else if (error.status) {
//   //         errorMessage = `Payment initialization failed: ${error.statusText || 'Server error'}`;
//   //       }
//   //       this.errorMessage = errorMessage;
//   //       console.error('Stripe initialization error:', error, 'Details:', {
//   //         status: error.status,
//   //         url: error.url,
//   //         message: error.message
//   //       });
//   //     }
//   //   }
  
//   //   private setupPaymentRequest(): void {
//   //     if (!this.stripe) {
//   //       console.warn('Stripe not initialized, skipping payment request setup');
//   //       return;
//   //     }
  
//   //     if (!this.paymentData) {
//   //       console.warn('Payment data not initialized, skipping payment request setup');
//   //       return;
//   //     }
  
//   //     const paymentRequest = this.stripe.paymentRequest({
//   //       country: 'US',
//   //       currency: 'usd',
//   //       total: {
//   //         label: 'Order Total',
//   //         amount: Math.round(this.paymentData.amount * 100)
//   //       },
//   //       requestPayerName: true,
//   //       requestPayerEmail: true
//   //     });
  
//   //     paymentRequest.canMakePayment().then((result: any) => {
//   //       if (result?.applePay || result?.googlePay) {
//   //         this.showPaymentRequestButton = true;
//   //         this.paymentRequestOptions = { paymentRequest };
//   //       }
//   //     });
  
//   //     paymentRequest.on('paymentmethod', async (ev: any) => {
//   //       try {
//   //         if (!this.elementsOptions.clientSecret) {
//   //           throw new Error('Client secret not initialized');
//   //         }
//   //         const { paymentIntent } = await this.stripe.confirmCardPayment(
//   //           this.elementsOptions.clientSecret,
//   //           { payment_method: ev.paymentMethod.id },
//   //           { handleActions: false }
//   //         );
  
//   //         if (paymentIntent!.status === 'succeeded') {
//   //           ev.complete('success');
//   //           await this.finalizePayment(paymentIntent!.id);
//   //         } else {
//   //           ev.complete('fail');
//   //           this.errorMessage = 'Payment failed. Please try another method.';
//   //         }
//   //       } catch (error) {
//   //         ev.complete('fail');
//   //         this.errorMessage = 'Payment processing error. Please try again.';
//   //         console.error('Payment request error:', error);
//   //       }
//   //     });
//   //   }
  
//   //   private async finalizePayment(paymentIntentId: string): Promise<void> {
//   //     if (!this.paymentData) {
//   //       throw new Error('Payment data not initialized');
//   //     }
//   //     await lastValueFrom(
//   //       this.paymentService.confirmPayment({
//   //         paymentIntentId,
//   //         deliveryAddressId: this.paymentData.deliveryAddressId,
//   //         amount: this.paymentData.amount
//   //       })
//   //     );
//   //   }
  
//   //   ngOnDestroy(): void {
//   //     this.destroy$.next();
//   //     this.destroy$.complete();
//   //   }
//   // }
  


// import { Component, Input, OnInit, inject, signal } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { loadStripe, Stripe, StripeElements, StripeElementsOptions } from '@stripe/stripe-js';
// import { PaymentService } from '../../../services/payment.service'; // Adjust path
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-payment-step',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './payment-step.component.html',
//   styleUrls: ['./payment-step.component.scss'],
// })
// export class PaymentStepComponent implements OnInit {
//   private http = inject(HttpClient);
//   private fb = inject(FormBuilder);
//   private paymentService = inject(PaymentService);

//   @Input() formGroup!: FormGroup; // FormGroup from CheckoutComponent
//   @Input() totalAmount: number = 0; // Final amount from CheckoutComponent

//   paymentForm!: FormGroup;
//   loading = signal(false);
//   paymentError = signal<string | null>(null);
//   paymentSuccess = signal(false);

//   stripe: Stripe | null = null;
//   elements: StripeElements | null = null;
//   paymentElement: any = null;
//   clientSecret: string = '';

//   async ngOnInit() {
//     this.initializeForm();
//     await this.loadStripe();
//     this.initializeStripeElements(this.clientSecret); // Initialize without clientSecret
//   }

//   initializeForm() {
//     this.paymentForm = this.fb.group({
//       name: ['', [Validators.required]],
//       email: ['', [Validators.required, Validators.email]],
//       method: ['card', [Validators.required]], // From parent formGroup
//     });
//     // Sync with parent formGroup
//     this.formGroup.get('paymentForm')?.valueChanges.subscribe((value) => {
//       this.paymentForm.patchValue(value, { emitEvent: false });
//     });
//     this.paymentForm.valueChanges.subscribe((value) => {
//       this.formGroup.get('paymentForm')?.patchValue(value, { emitEvent: false });
//     });
//   }

//   async loadStripe() {
//     try {
//       this.stripe = await loadStripe('your_stripe_publishable_key'); // Replace with your key
//       if (!this.stripe) {
//         throw new Error('Failed to load Stripe');
//       }
//     } catch (error) {
//       console.error('Error loading Stripe:', error);
//       this.paymentError.set('Failed to load payment system. Please try again later.');
//     }
//   }

//   initializeStripeElements(clientSecret: string) {
//     if (!this.stripe) {
//       this.paymentError.set('Payment system not initialized');
//       return;
//     }
//     try {
//       const options: StripeElementsOptions = {
//         clientSecret, // Optional: null for initial mount
//         appearance: {
//           theme: 'stripe',
//           variables: {
//             colorPrimary: '#0d6efd',
//             colorBackground: '#ffffff',
//             colorText: '#30313d',
//             colorDanger: '#df1b41',
//             fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
//             spacingUnit: '4px',
//             borderRadius: '4px',
//           },
//         },
//       };
//       this.elements = this.stripe.elements(options);
//       this.paymentElement = this.elements.create('payment', {
//         defaultValues: {
//           billingDetails: {
//             name: this.paymentForm.get('name')?.value || '',
//             email: this.paymentForm.get('email')?.value || '',
//           },
//         },
//       });
//       this.paymentElement.mount('#payment-element');
//     } catch (error) {
//       console.error('Error initializing payment element:', error);
//       this.paymentError.set('Failed to initialize payment form. Please try again later.');
//     }
//   }

//   async confirmPayment(clientSecret: string): Promise<{ success: boolean; error?: string; paymentIntentId?: string }> {
//     if (!this.stripe || !this.elements || !this.paymentForm.valid) {
//       return { success: false, error: 'Payment form invalid or not initialized' };
//     }
//     try {
//       this.loading.set(true);
//       this.paymentError.set(null);

//       // Update elements with clientSecret
//       // this.elements.update({clientSecret});

//       // Submit the payment element form
//       const { error: submitError } = await this.elements.submit();
//       if (submitError) {
//         return { success: false, error: submitError.message };
//       }

//       const { name, email } = this.paymentForm.value;
//       const { error, paymentIntent } = await this.stripe.confirmPayment({
//         elements: this.elements,
//         confirmParams: {
//           return_url: `${window.location.origin}/order-confirmation`,
//           receipt_email: email,
//           payment_method_data: {
//             billing_details: { name, email },
//           },
//         },
//         redirect: 'if_required',
//       });

//       if (error) {
//         return { success: false, error: error.message || 'Payment failed' };
//       }

//       this.paymentSuccess.set(true);
//       return { success: true, paymentIntentId: paymentIntent.id };
//     } catch (error: any) {
//       console.error('Payment error:', error);
//       return { success: false, error: error.message || 'An error occurred during payment' };
//     } finally {
//       this.loading.set(false);
//     }
//   }
// }
=======

  ngOnDestroy() {
    if (this.paymentElement) {
      this.paymentElement.unmount();
    }
  }
}
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
