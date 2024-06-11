import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from '../user.model';
import { ErrorHandlingService } from '../../core/services/error-handling.service';

@Component({
  selector: 'app-registration',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorHandlingService: ErrorHandlingService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const data = this.registrationForm.value
      delete data['confirmPassword']
      this.authService.register(this.registrationForm.value).subscribe({
        next: () => {
          this.registrationForm.reset();
          this.router.navigate(['/auth/login']);
        },
        error: (error: any) => {
          this.errorHandlingService.handleApiError(error);
        },
      });
    }
  }
}
