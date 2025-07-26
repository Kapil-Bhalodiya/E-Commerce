import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
<<<<<<< HEAD
import { StepperComponent } from '../../compoments/stepper/stepper.component'; // Fixed typo in path
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { StepConfig } from '../../compoments/stepper/models/step-config.model';
=======
import { StepperComponent } from '../../components/stepper/stepper.component'; // Fixed typo in path
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { StepConfig } from '../../components/stepper/models/step-config.model';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartStepComponent } from './cart-step/cart.component';
import { DeliveryAddressStepComponent } from './delivery-step/delivery-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { CartItem } from '../../models/cartItem.model';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';
<<<<<<< HEAD
import { SpinnerComponent } from "../../compoments/spinner/spinner.component";
=======
import { SpinnerComponent } from "../../components/spinner/spinner.component";
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { STORAGE_KEYS } from '../../core/constants/api.constants';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
<<<<<<< HEAD
  imports: [StepperComponent, CommonModule, FormsModule, SpinnerComponent],
=======
  imports: [StepperComponent, CommonModule, FormsModule, SpinnerComponent, ToastComponent],
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild(StepperComponent) formStepper!: StepperComponent;
  private ngUnsubscribe = new Subject<void>();
  formGroup!: FormGroup;
  currentFormGroup!: FormGroup;
  formGroupConfigs = {};
  referenceData = {
    cartItems: [] as CartItem[],
    addresses: [] as Address[]
  };
  steps: StepConfig[] = [];

  currentIndex: number = 0;
<<<<<<< HEAD
  isLoading:boolean = false;
=======
  isLoading: boolean = false;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  cartItems!: CartItem[];
  couponCode: string = '';
  couponError: string = '';
  discountAmount: number = 0;
  shippingCost: number = 10;
  errorMessage: string | null = null;
  addresses: Address[] = [];
  selectedAddressId: string | null = null;

<<<<<<< HEAD
=======
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  constructor(
    private fb: FormBuilder,
    private router: Router,
    public cartService: CartService,
    private addressService: AddressService,
    private orderService: OrderService,
  ) { this.formGroup = this.fb.group({}); }

  ngOnInit(): void {

    this.steps = [
      { index: 'cartForm', order: 1, label: 'Shopping Cart', component: CartStepComponent },
      { index: 'deliveryForm', order: 2, label: 'Delivery Address', component: DeliveryAddressStepComponent },
      { index: 'paymentForm', order: 3, label: 'Payment', component: PaymentStepComponent }
    ];

    this.initializeForm();
    this.fetchAddresses();
<<<<<<< HEAD
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
=======

    this.formGroup?.get('cartForm')?.get('items')?.updateValueAndValidity({ onlySelf: true });
    this.cartService.getCartItems$()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        catchError(error => {
          this.errorMessage = 'Failed to load cart items'
          this.cartItems = []
          return of([])
        })
      )
      .subscribe((items: CartItem[]) => {
        this.cartItems = items || []
        this.referenceData.cartItems = items
      })
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
<<<<<<< HEAD
=======
        paymentCompleted: [false],
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
        saveCard: [false],
      }),
    };
  }
<<<<<<< HEAD
  
=======

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  fetchAddresses() {
    this.isLoading = true;
    this.errorMessage = null;

    this.addressService.getAddresses().pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (addresses: Address[]) => {
        this.isLoading = false;
        this.addresses = addresses;
        this.referenceData.addresses = addresses
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load addresses. Please try again.';
        console.error('Address loading failed:', err);
      }
    });
  }

  addressTypeValidator(control: AbstractControl) {
    return control.value === '-1' ? { invalidAddressType: true } : null;
  }
<<<<<<< HEAD
  
  nextClickHandler(): void {
    const currentForm = this.formGroup.get(this.steps[this.currentIndex].index);
    if (currentForm?.invalid) {
      currentForm.markAllAsTouched();
      this.errorMessage = 'Please complete all required fields.';
      return;
    }
    if (this.currentIndex === this.steps.length - 1) {
=======

  nextClickHandler(): void {
    if (this.currentIndex === 0 && this.cartItems.length === 0) {
      this.showToastMessage('Your cart is empty. Please add items to continue.', 'warning');
      return;
    }

    const currentForm = this.formGroup.get(this.steps[this.currentIndex].index);
    if (currentForm?.invalid) {
      currentForm.markAllAsTouched();
      this.showToastMessage('Please complete all required fields.', 'warning');
      return;
    }

    // Special validation for payment step
    if (this.currentIndex === this.steps.length - 1) {
      if (!this.validatePayment()) {
        this.showToastMessage('Please complete payment before placing order.', 'error');
        return;
      }
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
      this.proceedToCheckout();
    } else {
      this.currentIndex++;
      this.formStepper.nextStep();
    }
  }
<<<<<<< HEAD
  
=======

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  previousClickHandler(): void {
    if (this.formStepper) {
      this.formStepper.previousStep();
    }
  }

  onTransitionCompleteHandler(ev: FormGroup): void {
    this.currentFormGroup = ev;
  }
<<<<<<< HEAD
  
=======

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  onSelectedIndexChangedHandler(index: number): void {
    this.currentIndex = index;
  }

  applyCoupon(): void {
    if (!this.couponCode) {
      this.couponError = 'Please enter a coupon code.';
      return;
    }
    this.orderService.validateCoupon(this.couponCode).pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe({
      next: (coupon) => {
        this.couponError = '';
        this.discountAmount = coupon.discountAmount || 0;
      },
      error: (err) => {
        this.couponError = err.error?.message || 'Invalid coupon code.';
        this.discountAmount = 0;
      }
    });
  }
<<<<<<< HEAD
  
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
    localStorage.setItem('orderForm', JSON.stringify(orderData));
    this.router.navigateByUrl('/checkout-complete');
=======

  getGrandTotal(): number {
    const subtotal = this.cartService.getSubtotal();
    const tax = subtotal * 0.1;
    const shipping = this.cartItems.length > 0 ? this.shippingCost : 0;
    return Math.round((subtotal + tax + shipping - this.discountAmount) * 100) / 100;
  }

  getShippingCost(): number {
    return this.cartItems.length > 0 ? this.shippingCost : 0;
  }

  proceedToCheckout(): void {
    const cartItems = this.cartService.getCartItems()
    if (!cartItems.length) {
      this.showToastMessage('Cart is empty', 'error');
      return
    }

    const orderData = {
      cartForm: { items: cartItems },
      deliveryAddressForm: {
        deliveryAddressId: this.formGroup.get('deliveryForm.addressId')?.value,
        newAddress: this.formGroup.get('deliveryForm.newAddress')?.value
      },
      paymentDetailForm: this.formGroup.get('paymentForm')?.value,
      couponCode: this.couponCode || undefined
    }
    this.isLoading = true;
    this.orderService.createOrder(orderData).pipe(
      takeUntil(this.ngUnsubscribe),
      catchError(err => {
        this.isLoading = false;
        this.showToastMessage('Failed to place order. Please try again.', 'error');
        return of(null);
      })
    ).subscribe((orderResponse) => {
      if (!orderResponse) return;
      this.showToastMessage('Order placed successfully!', 'success');
      this.cartService.clearCart()
      localStorage.setItem(STORAGE_KEYS.ORDER, JSON.stringify(orderResponse));
      this.isLoading = false;
      this.router.navigate(['/checkout-complete']);
    });
  }

  validatePayment(): boolean {
    const paymentForm = this.formGroup.get('paymentForm');
    const stripePaymentIntentId = paymentForm?.get('stripePaymentIntentId')?.value;
    const paymentCompleted = paymentForm?.get('paymentCompleted')?.value;

    // Check if payment is completed
    if (!paymentCompleted) {
      return false;
    }

    // Check if payment intent exists and is valid
    if (!stripePaymentIntentId || stripePaymentIntentId.trim() === '') {
      return false;
    }

    return true;
  }

  showToastMessage(message: string, type: 'success' | 'error' | 'warning') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

<<<<<<< HEAD


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
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
