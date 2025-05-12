import { Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProductsComponent
    },
    {
        path: 'cart',
        component: CheckoutComponent,
        canActivate: [AuthGuard]
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
    }
];
