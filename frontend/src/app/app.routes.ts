import { Routes } from '@angular/router';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { CartComponent } from './pages/cart/cart.component';
import { LoginComponent } from './features/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { RegisterComponent } from './features/register/register.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: ProductsListComponent
    },
    {
        path: 'cart',
        component: CartComponent,
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
