import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RxStompService } from '@stomp/ng2-stompjs';
import { AuthService } from '../services/auth.service';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-role-not-set',
  templateUrl: './role-not-set.component.html',
  styleUrls: ['./role-not-set.component.css'],
})
export class RoleNotSetComponent implements OnInit, OnDestroy {
  initDataForm: FormGroup;
  notValidFormWarning = false;
  requestSubmitted = false;
  buttonDisabled = false;
  serverError = false;
  phoneTypes = [
    { value: 'personal', viewValue: 'Personal' },
    { value: 'business', viewValue: 'Business' },
    { value: 'employer', viewValue: 'Employer' },
  ];
  roles = ['PARENT'];

  private topicSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private rxStompService: RxStompService
  ) {
    this.initDataForm = this.createSignupForm();

    this.rxStompService.configure({
      connectHeaders: {
        Authorization: localStorage.getItem('token'),
      },
    });
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
      studentData: this.fb.array([
        this.fb.group({
          firstName: [null, Validators.required],
          lastName: [null, Validators.required],
          citizenID: [null, Validators.required],
          dob: [null, Validators.required],
        }),
      ]),
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

  onPhoneRemove(index: number) {
    (<FormArray>this.initDataForm.get('parentData.phones')).removeAt(index);
  }

  onStudent() {
    const fGroup = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      citizenID: [null, Validators.required],
      dob: [null, Validators.required],
    });
    (<FormArray>this.initDataForm.get('studentData')).push(fGroup);
  }

  onStudentRemove(index: number) {
    (<FormArray>this.initDataForm.get('studentData')).removeAt(index);
  }

  onSubmit() {
    if (!this.initDataForm.valid) {
      this.notValidFormWarning = true;
      return;
    } else {
      this.notValidFormWarning = false;
    }

    const data = this.initDataForm.value;
    data.parentData.email = 'email@test.com';
    this.authService.submitRequestForRole(data).subscribe(
      () => {
        this.requestSubmitted = true;
        this.buttonDisabled = true;
      },
      () => (this.serverError = true)
    );
  }

  ngOnInit() {
    // this.topicSubscription = this.rxStompService
    //   .watch('/topic/news')
    //   .subscribe((message: Message) => {
    //     console.log(message.body);
    //   });
  }

  onSendMessage() {
    this.rxStompService.publish({
      destination: '/app/news',
      body: JSON.stringify({
        name: 'Malik',
        age: 3,
      }),
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }
}
