import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { StepperComponent } from '../../components/stepper/stepper.component'; // Fixed typo in path
import { catchError, of, Subject, takeUntil } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { StepConfig } from '../../components/stepper/models/step-config.model';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartStepComponent } from './cart-step/cart.component';
import { DeliveryAddressStepComponent } from './delivery-step/delivery-step.component';
import { PaymentStepComponent } from './payment-step/payment-step.component';
import { CartItem } from '../../models/cartItem.model';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.model';
import { SpinnerComponent } from "../../components/spinner/spinner.component";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [StepperComponent, CommonModule, FormsModule, SpinnerComponent],
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
  isLoading:boolean = false;
  cartItems!: CartItem[];
  couponCode: string = '';
  couponError: string = '';
  discountAmount: number = 0;
  shippingCost: number = 10;
  errorMessage: string | null = null;
  addresses: Address[] = [];
  selectedAddressId: string | null = null;

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
  
  nextClickHandler(): void {
    const currentForm = this.formGroup.get(this.steps[this.currentIndex].index);
    if (currentForm?.invalid) {
      currentForm.markAllAsTouched();
      this.errorMessage = 'Please complete all required fields.';
      return;
    }
    if (this.currentIndex === this.steps.length - 1) {
      this.proceedToCheckout();
    } else {
      this.currentIndex++;
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
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

