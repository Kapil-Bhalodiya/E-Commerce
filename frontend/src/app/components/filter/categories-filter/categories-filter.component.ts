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
  @Output() categorySelected = new EventEmitter<string>(); 

  onBrandClick(category: string) {
    this.categorySelected.emit(category); 
  }
}
