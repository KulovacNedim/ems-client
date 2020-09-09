import { Component, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomValidators } from '../../custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  minPasswordLength = 8;
  hidePassword = true;

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

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);

  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value)
        .subscribe()
      // errorMsg if error
      // this.captchaError = true;
    };
    this.captchaRef.reset();
  };

}
