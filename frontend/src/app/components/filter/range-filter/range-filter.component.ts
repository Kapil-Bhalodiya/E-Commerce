import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrimaryButtonComponent } from "../../primary-button/primary-button.component";
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-range-filter',
  imports: [PrimaryButtonComponent],
  templateUrl: './range-filter.component.html',
  styleUrl: './range-filter.component.scss'
})
export class RangeFilterComponent {
  @Input() minValue: number = 0; // Optional min value from parent
  @Input() maxValue: number = 250; // Optional max value from parent
  @Output() filterApplied = new EventEmitter<{ from: number; to: number }>(); // Emit price range

  priceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      from: [0],
      to: [this.maxValue]
    });
  }

  ngOnInit() {
    this.priceForm.patchValue({
      from: this.minValue,
      to: this.maxValue
    });
  }

  onFilter() {
    const { from, to } = this.priceForm.value;

    if (from <= to && from >= 0 && to <= this.maxValue) {
      this.filterApplied.emit({ from, to });
    } else {
      console.warn('Invalid price range. Ensure From <= To and within max limit.');
    }
  }
}
