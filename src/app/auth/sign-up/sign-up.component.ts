import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomValidators } from '../../custom-validators';
import { User } from '../user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  minPasswordLength = 8;
  hidePassword = true;

  @ViewChild('captchaRef') captchaRef: any;

  // captchaError: boolean = false;
  // siteKey: string;

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
        ])]
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );
  };

  get f() { return this.signUpForm.controls; }
  
  ngOnInit(): void {
    // this.siteKey='6LcJrMcZAAAAAEzNRHOeKoYeKdO_bsRFXQgFrP7g'
  }

  resolved(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
   
  }

  onSubmit(captchaResponse: string) {
    console.log(`Resolved response token: ${captchaResponse}`);
    console.log(this.captchaRef)
    this.captchaRef.reset();


    if (this.signUpForm.valid) {
      const user: User = {
        email: this.f.email.value,
        password: this.f.password.value,
        reCaptchaToken: captchaResponse
      }
      this.authService.signUp(user)
        .subscribe()
        // errorMsg if error
        // this.captchaError = true;
    }
  };

}
