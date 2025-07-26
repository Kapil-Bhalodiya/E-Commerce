import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout.component';
import { CartStepComponent } from './cart-step/cart.component';
<<<<<<< HEAD
import { StepperComponent } from '../../compoments/stepper/stepper.component';
=======
import { StepperComponent } from '../../components/stepper/stepper.component';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
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
