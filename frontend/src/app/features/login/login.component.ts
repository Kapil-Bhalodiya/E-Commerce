import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { PrimaryButtonComponent } from "../../compoments/primary-button/primary-button.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, PrimaryButtonComponent, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formGroup: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  loginHandle() {
    if (this.formGroup.valid) {
      const { email, password } = this.formGroup.value;
      this.authService.onLogin(email, password).subscribe({
        next: (response) => {
          console.log("reponse: ",response);
          localStorage.setItem('token', response.data.accessToken)
          this.router.navigate(['/']); // Replace with your intended route
        },
        error: (err) => {
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      });
    }
  }

}
