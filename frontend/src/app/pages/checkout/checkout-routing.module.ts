import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
<<<<<<< HEAD
import { CheckoutCompleteComponent } from './checkout-complete/checkout-complete.component';
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2

const routes: Routes = [
  {
    path: '',
    component: CheckoutComponent
<<<<<<< HEAD
  },
  {
    path: 'checkout-complete',
    component: CheckoutCompleteComponent
=======
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule {}