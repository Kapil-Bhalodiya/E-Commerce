import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SearchBoxComponent } from "../../search-box/search-box.component";
import { DropdownFilterComponent } from "../../filter/dropdown-filter/dropdown-filter.component";
import { CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-top',
  templateUrl: './header-top.component.html',
  styleUrl: './header-top.component.scss'
})
export class HeaderTopComponent implements OnInit {

  @Output() menuToggled = new EventEmitter<void>();

  dropDownList = [
    {
      label: 'All Category',
      value: 'categories'
    },
    {
      label: 'Men',
      value: 'men'
    },
  ]

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }
  
  cratItems: number = 0;
  checkLoggedInUser = localStorage.getItem('auth_token')

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cratItems = items.length);
  }

  toggleMenu() {
    this.menuToggled.emit();
  }
  onSearch($event: string) {
  }
  goToCart() {
    this.checkLoggedInUser ? this.router.navigate(['/checkout']): this.router.navigate(['/login'])
  }

  goToAccount(){
    this.checkLoggedInUser ? this.router.navigate(['/dashboard']) : this.router.navigate(['/login'])
  }
}
