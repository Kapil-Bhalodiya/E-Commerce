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
import { ToastComponent } from '../../shared/components/toast/toast.component';
import { STORAGE_KEYS } from '../../core/constants/api.constants';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  imports: [StepperComponent, CommonModule, FormsModule, SpinnerComponent, ToastComponent],
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
  isLoading: boolean = false;
  cartItems!: CartItem[];
  couponCode: string = '';
  couponError: string = '';
  discountAmount: number = 0;
  shippingCost: number = 10;
  errorMessage: string | null = null;
  addresses: Address[] = [];
  selectedAddressId: string | null = null;
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';

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
        paymentCompleted: [false],
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
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

