import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

const DIRECTIONS = ['row', 'row-reverse', 'column', 'column-reverse'];

@Component({
  selector: 'app-role-not-set',
  templateUrl: './role-not-set.component.html',
  styleUrls: ['./role-not-set.component.css'],
})
export class RoleNotSetComponent implements OnInit {
  initDataForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initDataForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      parentFirstName: [
        null,
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ]),
      ],
      parentLastName: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      parentCitizenID: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      parentDOB: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      city: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      street: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      employer: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      jobTitle: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      studentFirstName: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      studentLastName: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      studentCitizenID: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      studentDOB: [
        null,
        Validators.compose([
          Validators.required,
          // Validators.minLength(this.minPasswordLength),
        ]),
      ],
      reCaptchaToken: [null],
    });
  }

  get f() {
    return this.initDataForm.controls;
  }
  onSubmit() {}

  ngOnInit(): void {}
}
