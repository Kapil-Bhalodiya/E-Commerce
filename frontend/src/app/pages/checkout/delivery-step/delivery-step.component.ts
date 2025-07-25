import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../../models/address.model';
import { FormStepComponent } from '../../../components/stepper/models/form-step-cponent.model';
import { CommonModule } from '@angular/common';
import { AddressDetailFormComponent } from '../../../modules/forms/address-detail-form/address-detail-form.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-delivery-address',
  imports: [CommonModule, AddressDetailFormComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './delivery-step.component.html',
  styleUrls: ['./delivery-step.component.scss'],
})
export class DeliveryAddressStepComponent implements FormStepComponent, OnInit {
  @ViewChild('existingAddressTemplate', { static: true }) existingAddressTemplate!: TemplateRef<any>;
  @ViewChild('newAddressTemplate', { static: true }) newAddressTemplate!: TemplateRef<any>;

  @Input() formGroup!: FormGroup;
  @Input() globalFormGroup!: FormGroup;
  @Input() data: any = {};

  addresses: Address[] = [];
  selectedAddressId: string | null = null;
  accordionOptions: any[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.addresses = this.data.addresses;
    this.initializeAccordionOptions();
    this.setupFormValidation();
  }

  private initializeAccordionOptions(): void {
    this.accordionOptions = [
      { value: 'existing', label: 'Use Existing Address', content: this.existingAddressTemplate },
      { value: 'new', label: 'Add New Address', content: this.newAddressTemplate }
    ];
  }

  private setupFormValidation(): void {
    const addressIdControl = this.formGroup.get('addressId');
    const newAddressGroup = this.formGroup.get('newAddress') as FormGroup;

    // Define validators for newAddress fields
    const newAddressValidators = {
      firstName: [Validators.required],
      lastName: [Validators.required],
      phone: [Validators.required, Validators.pattern('^[0-9]{10}$')],
      addressType: [Validators.required, this.addressTypeValidator.bind(this)],
      address1: [Validators.required],
      address2: [],
      city: [Validators.required],
      country: [Validators.required],
      postalCode: [Validators.required, Validators.pattern('^[0-9]{4,6}$')],
      isDefault: []
    };

    if (this.addresses.length === 0) {
      this.formGroup.patchValue({ deliveryOption: 'new' });
    } else {
      const defaultAddress = this.addresses.find(a => a.isDefault);
      this.selectedAddressId = defaultAddress?._id || this.addresses[0]._id;
      this.formGroup.patchValue({ addressId: this.selectedAddressId });
    }

    this.formGroup.get('deliveryOption')?.valueChanges.pipe(
      takeUntil(this.destroy$)
    ).subscribe(value => {
      this.errorMessage = null;

      if (value === 'existing') {
        addressIdControl?.setValidators([Validators.required]);
        addressIdControl?.setValue(this.selectedAddressId || null);
        Object.keys(newAddressGroup.controls).forEach(key => {
          newAddressGroup.get(key)?.clearValidators();
          newAddressGroup.get(key)?.setValue('');
          newAddressGroup.get(key)?.updateValueAndValidity({ emitEvent: false });
        });
      } else {
        addressIdControl?.clearValidators();
        addressIdControl?.setValue(null);
        Object.entries(newAddressValidators).forEach(([key, validators]) => {
          newAddressGroup.get(key)?.setValidators(validators);
          newAddressGroup.get(key)?.updateValueAndValidity({ emitEvent: false });
        });
      }

      addressIdControl?.updateValueAndValidity({ emitEvent: false });
      newAddressGroup.updateValueAndValidity({ emitEvent: false });
    });

    // Trigger initial validation setup
    const currentDeliveryOption = this.formGroup.get('deliveryOption')?.value || 'existing';
    this.formGroup.get('deliveryOption')?.setValue(currentDeliveryOption);
    this.formGroup.get('deliveryOption')?.updateValueAndValidity({ emitEvent: true });
  }

  private addressTypeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    return control.value === '' || control.value === '-1' || !control.value ? { invalidAddressType: true } : null;
  }

  selectAddress(addressId: string): void {
    this.selectedAddressId = addressId;
    this.formGroup.patchValue({ addressId });
    this.formGroup.get('addressId')?.markAsTouched();
  }

  get newAddress(): FormGroup {
    return this.formGroup.get('newAddress') as FormGroup;
  }

  setDeliveryOption(option: string): void {
    this.formGroup.patchValue({ deliveryOption: option });
    this.formGroup.get('deliveryOption')?.markAsTouched();
  }

  getAddressIcon(type: string): string {
    switch (type?.toLowerCase()) {
      case 'home': return 'bi-house';
      case 'office': return 'bi-building';
      case 'work': return 'bi-briefcase';
      default: return 'bi-geo-alt';
    }
  }

  editAddress(addressId: string, event: Event): void {
    event.stopPropagation();
    // Implement edit address functionality
    console.log('Edit address:', addressId);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
