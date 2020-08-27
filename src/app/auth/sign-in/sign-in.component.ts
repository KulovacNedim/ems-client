import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.isAuthentcated.subscribe(isAuth => {
      // guard compnent from already logged in users
      if (isAuth) this.router.navigateByUrl('/dashboard');
      if (!isAuth && localStorage.getItem("token")) this.router.navigate(['/']);
    })
  }

  minPasswordLength = 8;
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
    password: new FormControl('', [
      Validators.minLength(this.minPasswordLength),
      Validators.required
    ])
  });

  get emailField() {
    return this.form.get('email');
  };

  get passwordField() {
    return this.form.get('password');
  };

  onSubmit() {
    if (this.form.valid) {
      this.authService.login(this.form.value)
        .subscribe()
    }
  };

}
