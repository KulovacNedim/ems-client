import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CustomValidators } from '../../custom-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  minPasswordLength = 8;
  hidePassword = true;

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
  
  ngOnInit(): void {}

  KL = () => console.log("DSDSDS")

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.login(this.signUpForm.value)
        .subscribe()
    }
  };

}
