import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'app-header-top',
  imports: [],
  templateUrl: './header-top.component.html',
  styleUrl: './header-top.component.scss'
})
export class HeaderTopComponent {
  @Output() menuToggled = new EventEmitter<void>();

  toggleMenu() {
    this.menuToggled.emit();
  }
}
