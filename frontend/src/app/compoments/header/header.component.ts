import { Component, inject, signal } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [PrimaryButtonComponent, RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(
    private router: Router
  ){}

  title = signal('My e-commerce App')
  cartService = inject(CartService)
  authService = inject(AuthService)

  handleLogout() {
    this.authService.logout().subscribe({
      next: (response) => {
        console.log("Logout Successful.!", response)
        this.router.navigateByUrl('/login')
      },
      error: (err) => {
        console.log("Logout Failed.!", err)
      }
    })
  }
}
