import { Component, EventEmitter, Input, Output } from '@angular/core';
import { QuantityBoxComponent } from "../quantity-box/quantity-box.component";
import { CommonModule } from '@angular/common';

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

  onRemove(id: string) {
    this.remove.emit(id);
  }
}
