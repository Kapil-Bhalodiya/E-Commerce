import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-box',
  imports: [CommonModule, FormsModule],
  templateUrl: './quantity-box.component.html',
  styleUrl: './quantity-box.component.scss'
})
export class QuantityBoxComponent {
  @Input() quantity: number = 1;
  @Input() maxQuantity: number = 10;
  @Output() quantityChange = new EventEmitter<number>();

  decrease(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.quantityChange.emit(this.quantity);
    }
  }

  increase(): void {
    if (this.quantity < this.maxQuantity) {
      this.quantity++;
      this.quantityChange.emit(this.quantity);
    }
  }

  onQuantityChange(event: any): void {
    const value = parseInt(event.target.value, 10);
    if (value >= 1 && value <= this.maxQuantity) {
      this.quantity = value;
      this.quantityChange.emit(this.quantity);
    }
  }
}
