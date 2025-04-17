import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from "../../compoments/primary-button/primary-button.component";

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, PrimaryButtonComponent, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formGroup: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/)]],
      contact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  registraionHandle(): void {
    if (this.formGroup.valid) {
      this.authService.onRegister(this.formGroup.value).subscribe({
        next: (res) => {
          console.log("res: ",res);
          if(res.success)
            this.router.navigateByUrl('/login')
        },
        error: (err) => {
          console.error("Registraion Failed.! ",err);
        }
      })
    } else {
      console.log("Form is invalid");
    }
  }
}
