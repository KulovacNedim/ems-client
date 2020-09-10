import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;
  minPasswordLength = 8;
  hidePassword = true;
  error: string = null;


  @ViewChild('captchaRef') captchaRef: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signInForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        email: [
          null,
          Validators.compose([Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")])
        ],
        password: [
          null,
          Validators.compose([
            Validators.required,
            Validators.minLength(this.minPasswordLength),
          ])
        ],
        reCaptchaToken: [
          null
        ]
      },
    );
  };

  get f() { return this.signInForm.controls; }

  ngOnInit(): void {
  };

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value)
        .subscribe(
          () => this.router.navigate(['/dashboard']),
          err => {
            if (err.status === 401) this.error = "Wrong credentials. Please try again.";
            else this.error = "Server encountered an error. Please try again later.";
          })
    }
    this.captchaRef.reset();
  };

}
