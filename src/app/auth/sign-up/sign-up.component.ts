import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CustomValidators } from '../../utils/custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  minPasswordLength = 8;
  hidePassword = true;
  successMsg: string = null;
  error: string = null;

  @ViewChild('captchaRef') captchaRef: any;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.signUpForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(this.minPasswordLength),
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            CustomValidators.patternValidator(/[a-zA-Z]/, {
              hasLetter: true
            })
          ])
        ],
        confirmPassword: [null, Validators.compose([
          Validators.minLength(this.minPasswordLength)
        ])],
        reCaptchaToken: [
          null
        ]
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );
  };

  get f() { return this.signUpForm.controls; }

  onSubmit() {
    if (this.signUpForm.valid) {
      const req = this.authService.signUp(this.signUpForm.value)
        .subscribe(
          () => this.successMsg = "We sent you an email. Pleas log into your email and confirm registration.",
          err => {
            if (err.status === 409) this.error = err.error.errors;
            else this.error = "Server encountered an error. Please try again later.";
          }
        );
        this.captchaRef.reset();
    };
  };
}
