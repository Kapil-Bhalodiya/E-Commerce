import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-variant',
  imports: [CommonModule],
  templateUrl: './radio-variant.component.html',
  styleUrl: './radio-variant.component.scss'
})
export class RadioVariantComponent {
  @Input() name: string = 'variant';
  @Input() options: string[] = [];
  @Input() selectedValue: string = '';
  @Input() isColor: boolean = false;
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}
