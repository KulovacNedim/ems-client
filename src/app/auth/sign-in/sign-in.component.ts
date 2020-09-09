import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
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
    // this.authService.isAuthentcated.subscribe(isAuth => {
    //   // guard compnent from already logged in users
    //   if (isAuth) this.router.navigateByUrl('/dashboard');
    //   if (!isAuth && localStorage.getItem("token")) this.router.navigate(['/']);
    // })
  };

  onSubmit() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value)
      this.authService.login(this.signInForm.value)
        .subscribe(status => {
          if (status === 200) this.router.navigate(['/dashboard']);
        })
    }
    this.captchaRef.reset();
  };

}
