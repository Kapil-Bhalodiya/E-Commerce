import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { SearchBoxComponent } from "../../search-box/search-box.component";
import { DropdownFilterComponent } from "../../filter/dropdown-filter/dropdown-filter.component";

@Component({
  selector: 'app-header-top',
  imports: [SearchBoxComponent, DropdownFilterComponent],
  templateUrl: './header-top.component.html',
  styleUrl: './header-top.component.scss'
})
export class HeaderTopComponent {
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
  
  toggleMenu() {
    this.menuToggled.emit();
  }
  onSearch($event: string) {
  }
}
