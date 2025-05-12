import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() showModal: boolean = true;
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter<void>();
  
  // Method to close the modal
  closeModal() {
    this.closeModalEvent.emit(); // Emit close event
  }
}
