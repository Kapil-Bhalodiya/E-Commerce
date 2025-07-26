import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accordion-radio',
  imports: [CommonModule, FormsModule],
  templateUrl: './accordion-radio.component.html',
  styleUrls: ['./accordion-radio.component.scss']
})
export class AccordionRadioComponent {
  @Input() name: string = 'variant';
  @Input() options: { label: string; value: string; content?: TemplateRef<any> }[] = [];
  @Input() selectedValue: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: string) {
    this.valueChange.emit(value);
  }
}
