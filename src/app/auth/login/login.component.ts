// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, tap } from 'rxjs';
import { FeatureService } from 'src/app/feature/feature.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  access_token!: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private featureSercive: FeatureService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      user_email: ['', [Validators.required, Validators.email]],
      user_password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.featureSercive.login(this.loginForm.value).subscribe({
        next: (res) => {
          const accessToken = res['user'].access_token;
          if (accessToken) {
            this.toastr.success(res.message)
            localStorage.setItem('token', accessToken);
            this.access_token = accessToken;
            // this.router.navigate(['/dashboard/jobs']);
          }
          console.log('Form Submitted!', this.loginForm.value);
        },
        error: (error) => {
          console.error('Login error');
          // Optionally, show an error message to the user
        },
      });
    }
       

  }
}
