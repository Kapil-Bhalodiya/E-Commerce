import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-address-detail-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './address-detail-form.component.html',
  styleUrls: ['./address-detail-form.component.scss']
})
export class AddressDetailFormComponent {
  @Input() formGroup!: FormGroup;
}

