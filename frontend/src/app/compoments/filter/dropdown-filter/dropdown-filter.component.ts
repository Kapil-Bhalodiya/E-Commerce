import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dropdown-filter',
  imports: [FormsModule, CommonModule],
  templateUrl: './dropdown-filter.component.html',
  styleUrl: './dropdown-filter.component.scss'
})
export class DropdownFilterComponent {
  @Input() items: any[] = [];
  size: string = 'medium';
  selectedOption: string = this.items[0];

  setSize(size: string): void {
    this.size = size;
  }

  onSortChange(): void {
    console.log(`Sorting by: ${this.selectedOption}`);
  }
}
