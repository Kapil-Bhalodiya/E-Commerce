import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface DropdownItem {
  label: string;
  value?: string;
  id?: string;
}

@Component({
  selector: 'app-dropdown-filter',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.scss']
})
export class DropdownFilterComponent implements OnInit, OnChanges {
  @Input() items: DropdownItem[] = [];
  @Input() size: string = 'medium';
  @Input() defaultOption: DropdownItem = { label: '-- Select --', value: '' };
  @Output() selectionChange = new EventEmitter<string>();
  selectedOption: string | undefined = ''; 

  ngOnInit(): void {
    this.setDefaultOption();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items.length > 0) {
      this.setDefaultOption();
    }
  }

  setDefaultOption(): void {
    if (this.items && this.items.length > 0) {
      this.selectedOption = this.items[0].value || this.items[0].id;
    } else {
      this.selectedOption = '';
    }
  }

  onSortChange(): void {
    if (this.selectedOption) {
      this.selectionChange.emit(this.selectedOption);
    }
  }
}