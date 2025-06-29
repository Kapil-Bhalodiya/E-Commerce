import { FormGroup } from '@angular/forms';

export interface FormStepComponent {
  formGroup: FormGroup;
  globalFormGroup: FormGroup;
  data: any;
}