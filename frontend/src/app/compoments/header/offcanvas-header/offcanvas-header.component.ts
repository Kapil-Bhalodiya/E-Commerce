import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-offcanvas-header',
  imports: [CommonModule],
  templateUrl: './offcanvas-header.component.html',
  styleUrl: './offcanvas-header.component.scss'
})
export class OffcanvasHeaderComponent {
  @Input() isMenuOpen = false;
  // isMenuOpen = false;

  // toggleMenu() {
  //   this.isMenuOpen = !this.isMenuOpen;
  // }
}
