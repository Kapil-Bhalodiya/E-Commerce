import { RouterModule, Routes } from '@angular/router';
import { CartStepComponent } from './pages/checkout/cart-step/cart.component';
import { LoginComponent } from './features/login/login.component';
<<<<<<< HEAD
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './features/register/register.component';
import { NgModule } from '@angular/core';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutCompleteComponent } from './pages/checkout/checkout-complete/checkout-complete.component';
=======
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/register/register.component';
import { NgModule } from '@angular/core';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutCompleteComponent } from './pages/checkout-complete/checkout-complete.component';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'cart',
        component: CartStepComponent
    },
    {
        path: 'checkout',
<<<<<<< HEAD
        component: CheckoutComponent
    },
    {
        path: 'checkout-complete',
        component: CheckoutCompleteComponent
    },
    {
        path: 'checkout',
        loadChildren: () => import('./pages/checkout/checkout.module').then((m) => m.CheckoutModule),
=======
        component: CheckoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'checkout-complete',
        component: CheckoutCompleteComponent,
        canActivate: [AuthGuard]
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    },
    {
        path: 'product',
        loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule),
        data: { breadcrumb: 'Product' }
    },
    {
        path: 'login',
        component: LoginComponent,
<<<<<<< HEAD
        // canActivate: [AuthGuard]
=======
        canActivate: [AuthGuard]
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    },
    {
        path: 'register',
        component: RegisterComponent,
<<<<<<< HEAD
        // canActivate: [AuthGuard]
=======
        canActivate: [AuthGuard]
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'user'] },
    },
];
@NgModule({
<<<<<<< HEAD
    imports: [RouterModule.forRoot(routes)],  // Make sure to use forRoot for app-level routing
=======
    imports: [RouterModule.forRoot(routes)],
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    exports: [RouterModule]
})
export class AppRoutingModule { }