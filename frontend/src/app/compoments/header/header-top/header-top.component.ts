import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { SearchBoxComponent } from "../../search-box/search-box.component";
import { DropdownFilterComponent } from "../../filter/dropdown-filter/dropdown-filter.component";
import { CartItem, CartService } from '../../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-top',
  imports: [SearchBoxComponent, DropdownFilterComponent],
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

  cartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
  }

  toggleMenu() {
    this.menuToggled.emit();
  }
  onSearch($event: string) {
  }
  goToCart() {
    this.router.navigate(['/checkout']);
  }
}
