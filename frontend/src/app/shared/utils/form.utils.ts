import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { VALIDATION_PATTERNS } from '../../core/constants/app.constants'

export class FormUtils {
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null
      return VALIDATION_PATTERNS.EMAIL.test(control.value) ? null : { email: true }
    }
  }

  static phoneValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null
      return VALIDATION_PATTERNS.PHONE.test(control.value) ? null : { phone: true }
    }
  }

  static markFormGroupTouched(formGroup: any): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key)
      control?.markAsTouched()
      
      if (control && typeof control === 'object' && control.controls) {
        this.markFormGroupTouched(control)
      }
    })
  }
}