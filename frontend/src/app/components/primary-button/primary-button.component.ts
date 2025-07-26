import { CommonModule } from '@angular/common';
import { Component, Input, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [CommonModule],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.scss'
})
export class PrimaryButtonComponent {
  label = input('')
  @Input() disabled: boolean = false;
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' = 'md';
  btnClicked = output()
}