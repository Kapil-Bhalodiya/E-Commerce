import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuantityBoxComponent } from "../quantity-box/quantity-box.component";
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-table',
  imports: [QuantityBoxComponent, CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Output() remove = new EventEmitter<string>();
<<<<<<< HEAD
=======
  @Output() quantityChange = new EventEmitter<{productId: string, quantity: number}>();
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  imageURL: string = environment.apiUrl;

  onRemove(id: string) {
    this.remove.emit(id);
  }
<<<<<<< HEAD
=======

  onQuantityChange(productId: string, quantity: number) {
    this.quantityChange.emit({productId, quantity});
  }
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
}
