import { Component, inject, signal } from '@angular/core';
// import { CartService } from '../../services/cart.service';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { CommonModule } from '@angular/common';
import { HeaderBottomComponent } from "./header-bottom/header-bottom.component";
import { HeaderTopComponent } from "./header-top/header-top.component";
import { OffcanvasHeaderComponent } from "./offcanvas-header/offcanvas-header.component";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  imports: [CommonModule, PrimaryButtonComponent, HeaderBottomComponent, HeaderTopComponent, OffcanvasHeaderComponent]
})
export class HeaderComponent {
  constructor(
    private router: Router
  ){}

  isMenuOpen = false;

  onMenuToggled() {
    console.log('Menu toggled, isMenuOpen:', !this.isMenuOpen);
    this.isMenuOpen = !this.isMenuOpen;
  }

  title = signal('SharkStore')
  subTitle = signal('Bold, fast, and cutting-edge.')
  // cartService = inject(CartService)
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
