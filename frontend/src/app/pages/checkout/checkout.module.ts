import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CartStepComponent } from './cart-step/cart.component';
import { StepperComponent } from '../../components/stepper/stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepperComponent,
    CheckoutComponent,
    CartStepComponent,
    CheckoutCompleteComponent
  ],
  exports: [
    StepperComponent,
    CheckoutComponent,
    CartStepComponent,
    CheckoutCompleteComponent
  ]
})
export class CheckoutModule { }
