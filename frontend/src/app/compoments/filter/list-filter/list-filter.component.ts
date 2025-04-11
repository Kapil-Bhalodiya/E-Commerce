import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  imports: [CommonModule],
  templateUrl: './list-filter.component.html',
  styleUrl: './list-filter.component.scss'
})
export class ListFilterComponent {
  @Input() checkboxItems: { label: string; checked: boolean }[] = []; // List of checkbox items
  @Output() checkboxChange = new EventEmitter<{ label: string; checked: boolean }>(); // Emit changes

  onCheckboxChange(item: { label: string; checked: boolean }, event: Event) {
    item.checked = (event.target as HTMLInputElement).checked;
    this.checkboxChange.emit({ ...item, checked: item.checked }); // Emit the updated item
  }
}
