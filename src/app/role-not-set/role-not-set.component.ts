import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role-not-set',
  templateUrl: './role-not-set.component.html',
  styleUrls: ['./role-not-set.component.css'],
})
export class RoleNotSetComponent {
  initDataForm: FormGroup;
  notValidFormWarning = false;
  phoneTypes = [
    { value: 'personal', viewValue: 'Personal' },
    { value: 'business', viewValue: 'Business' },
    { value: 'employer', viewValue: 'Employer' },
  ];
  roles = ['PARENT'];

  constructor(private fb: FormBuilder) {
    this.initDataForm = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      parentData: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        citizenID: [null, Validators.required],
        dob: [null, Validators.required],
        city: [null, Validators.required],
        street: [null, Validators.required],
        phones: this.fb.array([
          this.fb.group({
            phoneType: [null, Validators.required],
            phoneOwner: [null, Validators.required],
            phoneNumber: [null, Validators.required],
          }),
        ]),
        employer: [null],
        jobTitle: [null],
        requestedRole: [null, Validators.required],
      }),
      studentData: this.fb.group({
        firstName: [null, Validators.required],
        lastName: [null, Validators.required],
        citizenID: [null, Validators.required],
        dob: [null, Validators.required],
      }),
    });
  }

  onAddPhone() {
    const fGroup = this.fb.group({
      phoneType: [null, Validators.required],
      phoneOwner: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    });
    (<FormArray>this.initDataForm.get('parentData.phones')).push(fGroup);
  }

  onSubmit() {
    if (!this.initDataForm.valid) this.notValidFormWarning = true;
    console.log(this.initDataForm.value);
  }
}
