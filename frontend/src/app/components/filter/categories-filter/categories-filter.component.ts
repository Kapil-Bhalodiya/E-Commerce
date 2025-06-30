import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-categories-filter',
  imports: [CommonModule],
  templateUrl: './categories-filter.component.html',
  styleUrl: './categories-filter.component.scss'
})
export class CategoriesFilterComponent {
  @Input() items: string[] = [];
  @Output() selectionChange = new EventEmitter<string[]>();
  selectedItems: string[] = [];

  onBrandClick(category: string) {
    const index = this.selectedItems.indexOf(category);
    if (index > -1) {
      this.selectedItems.splice(index, 1);
    } else {
      this.selectedItems.push(category);
    }
    this.selectionChange.emit([...this.selectedItems]);
  }

  isSelected(category: string): boolean {
    return this.selectedItems.includes(category);
  }
}
