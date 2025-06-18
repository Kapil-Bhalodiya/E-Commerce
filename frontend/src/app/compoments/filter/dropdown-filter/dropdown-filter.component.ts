import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

// Define an interface for the dropdown items to handle both value and id
interface DropdownItem {
  label: string;
  value?: string; // Optional for dropDownList
  id?: string;    // Optional for dropDownSort, dropPageSort
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
      this.selectedOption = this.items[0].value;
    } else {
      this.selectedOption = '';
    }
  }

  onSortChange(): void {
    console.log(`Sorting by: ${this.selectedOption}`);
  }
}