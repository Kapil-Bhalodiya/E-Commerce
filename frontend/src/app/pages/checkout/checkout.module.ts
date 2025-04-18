import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CartStepComponent } from './cart-step/cart.component';
import { StepperComponent } from '../../compoments/stepper/stepper.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepperComponent,
    CheckoutComponent,
    CartStepComponent
    
  ],
  exports: [
    StepperComponent,
    CheckoutComponent,
    CartStepComponent
  ]
})
export class CheckoutModule { }
