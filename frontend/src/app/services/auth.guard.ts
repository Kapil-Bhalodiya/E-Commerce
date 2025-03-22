// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';  // Import the AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    console.log("route: ", route, this.authService.isAuthenticated())

    const isLoginOrRegister = route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register';

    if (this.authService.isAuthenticated()) {
      if (isLoginOrRegister) {
        this.router.navigate(['/']);
        return false;
      }
      return true;
    }
    if (isLoginOrRegister) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
