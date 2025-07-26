import { Injectable } from '@angular/core'
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router'
import { Observable, map } from 'rxjs'
import { AuthService } from '../../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const isLoginOrRegister = route.routeConfig?.path === 'login' || route.routeConfig?.path === 'register'

    return this.authService.isAuthenticated$.pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          if (isLoginOrRegister) {
            this.router.navigate(['/'])
            return false
          }
          return true
        }
        
        if (isLoginOrRegister) {
          return true
        }
        
        this.router.navigate(['/login'])
        return false
      })
    )
  }
}
