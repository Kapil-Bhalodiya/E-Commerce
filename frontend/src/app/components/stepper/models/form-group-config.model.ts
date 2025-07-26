import { FormGroup } from '@angular/forms';

export interface FormGroupConfig<T> {
  [key: string]: FormGroup | any;
}