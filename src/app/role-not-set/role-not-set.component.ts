import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-role-not-set',
  templateUrl: './role-not-set.component.html',
  styleUrls: ['./role-not-set.component.css'],
})
export class RoleNotSetComponent {
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
      phones: new FormArray([
        new FormGroup({
          phoneType: new FormControl(null, Validators.required),
          phoneOwner: new FormControl(null, Validators.required),
          phoneNumber: new FormControl(null, Validators.required),
        }),
      ]),
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

  phoneTypes = [
    { value: 'personal', viewValue: 'Personal' },
    { value: 'business', viewValue: 'Business' },
    { value: 'employer', viewValue: 'Employer' },
  ];

  onAddPhone() {
    const fGroup = new FormGroup({
      phoneType: new FormControl('employer', Validators.required),
      phoneOwner: new FormControl(null, Validators.required),
      phoneNumber: new FormControl('061', Validators.required),
    });
    (<FormArray>this.initDataForm.get('phones')).push(fGroup);
  }

  onSubmit() {
    console.log(this.initDataForm.value);
  }
}
