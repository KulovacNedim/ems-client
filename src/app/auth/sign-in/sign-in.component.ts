import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit, OnDestroy {
  signInForm: FormGroup;
  minPasswordLength = 8;
  hidePassword = true;
  error: string = null;
  succMsg: string = null;
  errorMsg: Subscription;
  successMsg: Subscription;

  @ViewChild('captchaRef') captchaRef: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signInForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      email: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(this.minPasswordLength),
        ]),
      ],
      reCaptchaToken: [null],
    });
  }

  get f() {
    return this.signInForm.controls;
  }

  ngOnInit(): void {
    this.errorMsg = this.authService.errMsg.subscribe(
      (errMsg) => (this.error = errMsg)
    );
    this.successMsg = this.authService.succMsg.subscribe(
      (succMsg) => (this.succMsg = succMsg)
    );
  }

  ngOnDestroy(): void {
    this.errorMsg.unsubscribe();
    this.successMsg.unsubscribe();
  }

  onSubmit() {
    if (this.signInForm.valid) {
      this.authService.signIn(this.signInForm.value).subscribe(
        () => {
          this.authService.getAuthenticatedUserData().subscribe((user) => {
            const userResponse = <User>user;
            const roleNotSet = !!userResponse.notEnabledReasons.filter(
              (r) => r.reason === 'MISSING_ROLE'
            )[0];
            if (roleNotSet) this.router.navigate(['/dashboard/role-not-set']);
            else this.router.navigate(['/dashboard']);
          });
        },
        (err) => {
          if (err.status === 400) this.error = err.error.message;
          else if (err.status === 401)
            this.error = 'Wrong credentials. Please try again.';
          else
            this.error = 'Server encountered an error. Please try again later.';
        }
      );
      this.captchaRef.reset();
    }
  }
}
