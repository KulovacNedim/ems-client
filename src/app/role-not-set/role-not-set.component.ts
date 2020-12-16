import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role-not-set',
  templateUrl: './role-not-set.component.html',
  styleUrls: ['./role-not-set.component.css'],
})
export class RoleNotSetComponent {
  initDataForm: FormGroup;
  notValidFormWarning = false;

  constructor(private fb: FormBuilder) {
    this.initDataForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      parentData: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        citizenID: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
        city: new FormControl(null, Validators.required),
        street: new FormControl(null, Validators.required),
        phones: new FormArray([
          new FormGroup({
            phoneType: new FormControl(null, Validators.required),
            phoneOwner: new FormControl(null, Validators.required),
            phoneNumber: new FormControl(null, Validators.required),
          }),
        ]),
        employer: new FormControl(null),
        jobTitle: new FormControl(null),
        requestedRole: new FormControl(null, Validators.required),
      }),
      studentData: new FormGroup({
        firstName: new FormControl(null, Validators.required),
        lastName: new FormControl(null, Validators.required),
        citizenID: new FormControl(null, Validators.required),
        dob: new FormControl(null, Validators.required),
      }),
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

  roles = ['PARENT'];

  onAddPhone() {
    const fGroup = new FormGroup({
      phoneType: new FormControl(null, Validators.required),
      phoneOwner: new FormControl(null, Validators.required),
      phoneNumber: new FormControl(null, Validators.required),
    });
    (<FormArray>this.initDataForm.get('parentData.phones')).push(fGroup);
  }

  onSubmit() {
    if (!this.initDataForm.valid) this.notValidFormWarning = true;
    console.log(this.initDataForm.value);
  }
}
