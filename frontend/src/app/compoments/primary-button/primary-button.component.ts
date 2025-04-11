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


// import { Component, Input, Output, EventEmitter } from '@angular/core';

// @Component({
//   selector: 'app-primary-button',
//   templateUrl: './primary-button.component.html',
//   styleUrls: ['./primary-button.component.scss']
// })
// export class PrimaryButtonComponent {
//   // @Input() decorator is used to accept a value from the parent component
//   @Input() label: string = '';  // Default value can be set
//   @Input() disabled: boolean = false;  // Disabled property

//   // @Output() decorator is used to emit events to the parent component
//   @Output() btnClicked: EventEmitter<void> = new EventEmitter();  // Emit an event when the button is clicked

//   // Method to handle the button click and emit the event
//   onButtonClick(): void {
//     this.btnClicked.emit();  // Emit the event to parent component
//   }
// }
