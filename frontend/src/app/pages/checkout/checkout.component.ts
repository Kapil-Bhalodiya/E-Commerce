import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StepperComponent } from '../../compoments/stepper/stepper.component'; // Fixed typo in path
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { StepConfig } from '../../compoments/stepper/models/step-config.model';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartStepComponent } from './cart-step/cart.component';
import { DeliveryAddressStepComponent } from './delivery-step/delivery-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { CartItem } from '../../models/cartItem.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [StepperComponent, CommonModule, FormsModule],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild(StepperComponent) formStepper!: StepperComponent;
  private ngUnsubscribe = new Subject<void>();
  formGroup!: FormGroup;
  currentFormGroup!: FormGroup;
  formGroupConfigs = {};
  referenceData = {
    cartItems: [] as CartItem[],
  };
  steps: StepConfig[] = [];

  currentIndex: number = 0;
  isLoaded: boolean = false;
  cartItems!: CartItem[];
  couponCode: string = '';
  notes: string = '';
  couponError: string = '';
  discountAmount: number = 0;
  shippingCost: number = 10;

  constructor(
    private fb: FormBuilder,
    public cartService: CartService,
    private orderService: OrderService,
    private router: Router,
  ) { this.formGroup = this.fb.group({}); }

  ngOnInit(): void {
    console.log('CheckoutComponent initialized');

    this.steps = [
      { index: 'cartForm', order: 1, label: 'Shopping Cart', component: CartStepComponent },
      { index: 'deliveryForm', order: 2, label: 'Delivery Address', component: DeliveryAddressStepComponent },
      { index: 'paymentForm', order: 3, label: 'Payment', component: PaymentStepComponent }
    ];

    this.initializeForm();
    // this.fetchAddressTypes();
    // this.fetchProvinces();
    this.formGroup?.get('cartForm')?.get('items')?.updateValueAndValidity({ onlySelf: true });
    this.cartService.getCartItems$()
      .pipe(takeUntil(this.ngUnsubscribe),
        catchError(error => {
          console.error('Error fetching cart items:', error);
          this.cartItems = []; // Fallback to empty array
          return of([]);
        })
      )
      .subscribe((items: any[]) => {
        console.log('Cart items received:', items);
        this.cartItems = items || [];
      });

      console.log("currentFormGroup : ",this.currentFormGroup?.valid)
      console.log("currentFormGroup : ",this.currentFormGroup?.value)
  }

  initializeForm() {
    this.formGroup = this.fb.group({});
    this.formGroupConfigs = {
      cartForm: this.fb.group({
        items: [[null, [], Validators.required]]
      }),
      deliveryForm: this.fb.group({
        deliveryOption: ['existing', Validators.required],
        addressId: [null, Validators.required],
        newAddress: this.fb.group({
          firstName: [''],
          lastName: [''],
          phone: [''],
          addressType: [null],
          address1: [''],
          address2: [''],
          city: [''],
          country: [''],
          postalCode: [''],
          isDefault: [false]
        }),
      }),
      paymentForm: this.fb.group({
        method: ['card'],
        provider: ['Stripe'],
        stripePaymentIntentId: [''],
        saveCard: [false],
      }),
    };
  }

  addressTypeValidator(control: AbstractControl) {
    return control.value === '-1' ? { invalidAddressType: true } : null;
  }

  nextClickHandler(): void {
    console.log("this.currentIndex: ", this.currentIndex, ' = ', this.steps.length - 1);
    console.log("this.formGroup.valid: ", this.formGroup.valid);
    console.log("deliveryForm valid: ", this.formGroup.get('deliveryForm')?.valid);
    console.log("deliveryForm errors: ", this.formGroup.get('deliveryForm')?.errors);
    console.log("deliveryForm value: ", this.formGroup.get('deliveryForm')?.value);
    if (this.currentIndex === this.steps.length - 1 && this.formGroup.valid) {
      console.log("Proceed to Checkout....!");
      this.proceedToCheckout();
    }
    if (this.formStepper) {
      this.formStepper.nextStep();
    }
  }

  previousClickHandler(): void {
    if (this.formStepper) {
      this.formStepper.previousStep();
    }
  }

  onTransitionCompleteHandler(ev: FormGroup): void {
    this.currentFormGroup = ev;
  }

  onSelectedIndexChangedHandler(index: number): void {
    this.currentIndex = index;
  }

  applyCoupon(): void {
    if (this.couponCode) {
      this.orderService.validateCoupon(this.couponCode).subscribe({
        next: (coupon) => {
          this.couponError = '';
          // Apply discount logic (example)
          // this.charges.onceOffCharges[0] = { ...this.charges.onceOffCharges[0], discountAmount: coupon.discountAmount };
        },
        error: (err) => {
          this.couponError = err.error.message || 'Invalid coupon';
        },
      });
    }
  }

  proceedToCheckout(): void {
    if (!this.cartService.getCartItems().length) {
      alert('Cart is empty');
      return;
    }

    const orderData = {
      cartForm: {
        items: JSON.parse(localStorage.getItem('cart') as string),
      },
      deliveryAddressForm: {
        deliveryAddressId: this.formGroup.get('deliveryForm.addressId')?.value,
        deliverAddress: this.formGroup.get('deliveryForm.newAddress')?.value
      },
      paymentDetailForm: this.formGroup.get('paymentForm')?.value,
      couponCode: this.couponCode || null,
    };

    console.log("orderData : ",orderData);
    
    this.orderService.createOrder(orderData).subscribe({
      next: (response: any) => {
        console.log("resposen : ",response)
        // const { clientSecret, order } = response.data;
  
        // Confirm payment
        // this.paymentStep.handleSubmit().then((paymentResult) => {
        //   if (!paymentResult.success) {
        //     throw new Error(paymentResult.error || 'Payment failed');
        //   }
  
          // Update paymentForm with paymentIntentId
          // this.formGroup.get('paymentForm')?.patchValue({
          //   stripePaymentIntentId: paymentResult.paymentIntentId,
          // });
  
          // // Confirm order
          // this.orderService
          //   .confirmOrder({ orderId: order._id, paymentIntentId: paymentResult.paymentIntentId })
          //   .subscribe({
          //     next: () => {
          //       // Clear cart and redirect
          //       this.cartService.clearCart();
          //       this.router.navigate(['/order-confirmation', order._id]);
          //     },
          //     error: (confirmError: any) => {
          //       console.error('Confirm order error:', confirmError);
          //       alert(confirmError.message || 'Failed to confirm order');
          //     },
          //   });
      //   }).catch((paymentError: any) => {
      //     console.error('Payment error:', paymentError);
      //     alert(paymentError.message || 'Payment failed');
      //   });
      },
      error: (error: any) => {
        console.error('Checkout error:', error);
        alert(error.message || 'Failed to create order');
      },
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}



// import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Subject, of } from 'rxjs';
// import { takeUntil, catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// import { CartService } from '../../services/cart.service';
// import { OrderService } from '../../services/order.service';
// import { StepperComponent } from '../../compoments/stepper/stepper.component';
// import { FormGroupConfig } from '../../compoments/stepper/models/form-group-config.model';
// import { StepConfig } from '../../compoments/stepper/models/step-config.model';

// import { CartStepComponent } from './cart-step/cart.component';
// import { DeliveryAddressStepComponent } from './delivery-step/delivery-step.component';
// import { PaymentStepComponent } from './payment-step/payment-step.component';

// @Component({
//   selector: 'app-checkout',
//   templateUrl: './checkout.component.html',
//   styleUrls: ['./checkout.component.scss']
// })
// export class CheckoutComponent implements OnInit, OnDestroy {
//   @ViewChild(StepperComponent) formStepper!: StepperComponent;

//   formGroup!: FormGroup;
//   currentFormGroup!: FormGroup;

//   cartItems: any[] = [];
//   couponCode: string = '';
//   couponError: string = '';
//   notes: string = '';

//   currentIndex: number = 0;
//   isLoaded: boolean = false;

//   discountAmount: number = 0;
//   shippingCost: number = 10;

//   private ngUnsubscribe = new Subject<void>();

  
//   steps: StepConfig[] = [
//     { index: 'cartForm', order: 1, component: CartStepComponent, label: 'Shopping Cart' },
//     { index: 'deliveryForm', order: 2, component: DeliveryAddressStepComponent, label: 'Delivery Address' },
//     { index: 'paymentForm', order: 3, component: PaymentStepComponent, label: 'Payment Details' },
//   ];
  
//   constructor(
//     private fb: FormBuilder,
//     public cartService: CartService,
//     private orderService: OrderService,
//     private router: Router
//   ) {
//     this.formGroup = this.fb.group({
//       cartForm: this.formGroupConfigs.cartForm,
//       deliveryForm: this.formGroupConfigs.deliveryForm,
//       paymentForm: this.formGroupConfigs.paymentForm,
//     });
//   }
//   formGroupConfigs: FormGroupConfig<any> = {
//     cartForm: this.fb.group({}),
//     deliveryForm: this.fb.group({}),
//     paymentForm: this.fb.group({}),
//   };
  
//   ngOnInit(): void {
//     this.cartService.getCartItems$()
//       .pipe(
//         takeUntil(this.ngUnsubscribe),
//         catchError(error => {
//           console.error('Error loading cart:', error);
//           return of([]);
//         })
//       )
//       .subscribe((items) => {
//         this.cartItems = items || [];
//         this.isLoaded = true;
//       });
//   }

//   nextClickHandler(): void {
//     if (this.currentIndex === this.steps.length - 1 && this.formGroup.valid) {
//       this.proceedToCheckout();
//     }
//     this.formStepper?.nextStep();
//   }

//   previousClickHandler(): void {
//     this.formStepper?.previousStep();
//   }

//   onTransitionCompleteHandler(form: FormGroup): void {
//     this.currentFormGroup = form;
//   }

//   onSelectedIndexChangedHandler(index: number): void {
//     this.currentIndex = index;
//   }

//   applyCoupon(): void {
//     if (!this.couponCode) return;

//     this.orderService.validateCoupon(this.couponCode).subscribe({
//       next: (coupon) => {
//         this.couponError = '';
//         this.discountAmount = coupon.discountAmount || 0;
//         // optionally update formGroup or order total here
//       },
//       error: (err) => {
//         this.couponError = err.error.message || 'Invalid coupon';
//       }
//     });
//   }

//   proceedToCheckout(): void {
//     const items = this.cartService.getCartItems().map(item => ({
//       productId: item.productId,
//       quantity: item.quantity,
//     }));

//     if (!items.length) {
//       alert('Your cart is empty.');
//       return;
//     }

//     const shippingAddressId = this.formGroup.get('deliveryForm.addressId')?.value;
//     const paymentMethod = this.formGroup.get('paymentForm.method')?.value;

//     const orderData = {
//       items,
//       shippingAddressId,
//       paymentMethod,
//       couponCode: this.couponCode || null,
//       notes: this.notes || null,
//     };

//     this.orderService.createOrder(orderData).subscribe({
//       next: (response) => {
//         this.cartService.clearCart();
//         this.router.navigate(['/order-confirmation', response.data._id]);
//       },
//       error: (err) => {
//         alert(err.error.message || 'Failed to create order');
//       }
//     });
//   }

//   ngOnDestroy(): void {
//     this.ngUnsubscribe.next();
//     this.ngUnsubscribe.complete();
//   }
// }
