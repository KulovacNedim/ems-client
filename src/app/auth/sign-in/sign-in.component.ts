import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  minPasswordLength = 8;
  userEmails = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.minLength(this.minPasswordLength),
      Validators.required
    ])
  });

  get emailField() {
    return this.userEmails.get('email');
  };

  get passwordField() {
    return this.userEmails.get('password');
  };

  onSubmit() {
    if (this.userEmails.valid) {
      this.authService.login(this.userEmails.value)
        .subscribe()
    }
  };

}
