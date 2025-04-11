import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { SearchBoxComponent } from "../../search-box/search-box.component";

@Component({
  selector: 'app-header-top',
  imports: [SearchBoxComponent],
  templateUrl: './header-top.component.html',
  styleUrl: './header-top.component.scss'
})
export class HeaderTopComponent {
  @Output() menuToggled = new EventEmitter<void>();
  
  toggleMenu() {
    this.menuToggled.emit();
  }
  onSearch($event: string) {
  }
}
