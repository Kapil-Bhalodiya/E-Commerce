import { RouterModule, Routes } from '@angular/router';
import { CartStepComponent } from './pages/checkout/cart-step/cart.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { RegisterComponent } from './features/register/register.component';
import { NgModule } from '@angular/core';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CheckoutCompleteComponent } from './pages/checkout-complete/checkout-complete.component';
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
        component: CheckoutComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'checkout-complete',
        component: CheckoutCompleteComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'product',
        loadChildren: () => import('./pages/products/products.module').then((m) => m.ProductsModule),
        data: { breadcrumb: 'Product' }
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'user'] },
    },
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }