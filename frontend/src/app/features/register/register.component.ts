import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
<<<<<<< HEAD
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
=======
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy {
  formGroup!: FormGroup;
  errorMessage = '';
  successMessage = '';
  isLoading = false;
  showPassword = false;
<<<<<<< HEAD
=======
  showConfirmPassword = false;
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formGroup = this.fb.group({
<<<<<<< HEAD
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      contact: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]]
    });
=======
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      confirmPassword: ['', [Validators.required]],
      contact: ['', [Validators.required, Validators.pattern(/^[0-9]\d{9}$/)]]
    }, { validators: this.passwordMatchValidator });
>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

<<<<<<< HEAD
  getPasswordStrength(): string {
    const password = this.formGroup.get('password')?.value || '';
    let score = 0;
    
=======
  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  getPasswordStrength(): string {
    const password = this.formGroup.get('password')?.value || '';
    let score = 0;

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    if (password.length >= 6) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
<<<<<<< HEAD
    
=======

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    if (score <= 2) return 'weak';
    if (score === 3) return 'fair';
    if (score === 4) return 'good';
    return 'strong';
  }

  getPasswordStrengthText(): string {
    const strength = this.getPasswordStrength();
    const strengthMap = {
      weak: 'Weak password',
      fair: 'Fair password',
      good: 'Good password',
      strong: 'Strong password'
    };
    return strengthMap[strength as keyof typeof strengthMap];
  }

  registrationHandle(): void {
    if (this.formGroup.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';
<<<<<<< HEAD
    
=======

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    const formData = {
      ...this.formGroup.value,
      firstName: this.formGroup.value.firstName.trim(),
      lastName: this.formGroup.value.lastName.trim(),
      email: this.formGroup.value.email.toLowerCase().trim()
    };
<<<<<<< HEAD
    
=======

>>>>>>> 10efdd97221964535597c2e8cecef16614e283e2
    this.authService.register(formData)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isLoading = false;
          if (response.success) {
            this.successMessage = 'Account created successfully! Redirecting to login...';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 2000);
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.handleRegistrationError(err);
        }
      });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.formGroup.controls).forEach(key => {
      this.formGroup.get(key)?.markAsTouched();
    });
  }

  private handleRegistrationError(error: any): void {
    if (error.status === 409) {
      this.errorMessage = 'An account with this email already exists. Please use a different email.';
    } else if (error.status === 400) {
      this.errorMessage = 'Please check your information and try again.';
    } else if (error.status === 0) {
      this.errorMessage = 'Unable to connect to server. Please check your internet connection.';
    } else {
      this.errorMessage = 'An unexpected error occurred. Please try again later.';
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
