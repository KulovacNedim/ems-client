import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Message } from '@stomp/stompjs';

import * as fromApp from '../../../store/app.reducer';
import { Notification } from '../../../../app/models/notification';
import { RxStompService } from '@stomp/ng2-stompjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  AddNotifications,
  AddNotification,
} from 'src/app/dashboard/app-bar/notifications/store/notifications.actions';
import { AuthService } from 'src/app/services/auth.service';
import { Role, User } from 'src/app/auth/user';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: Observable<{ notifications: Notification[] }>;
  authUser: Subscription;
  topicSubscription: Subscription;
  roles = [];

  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private rxStompService: RxStompService,
    private authService: AuthService
  ) {
    this.rxStompService.configure({
      connectHeaders: {
        Authorization: localStorage.getItem('token'),
      },
    });
  }

  ngOnInit(): void {
    this.notifications = this.store.select('notifications');
    this.notifications.subscribe(
      (nots) => console.log(nots),
      (err) => console.log(err)
    );
    // get notifications
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .get('http://localhost:8080/api/my-notifications', httpOptions)
      .subscribe((notifications: Notification[]) => {
        this.store.dispatch(new AddNotifications(notifications));
      });
    // subscribe for new notifications
    this.authUser = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.authenticatedUser;
        })
      )
      .subscribe((user: User) => {
        this.roles = user?.roles.filter(
          (role: Role) =>
            role.roleName === 'TEACHER' || role.roleName === 'ADMIN'
        );

        if (this.roles?.length > 0) {
          this.topicSubscription = this.rxStompService
            .watch('/topic/notifications')
            .subscribe((message: Message) => {
              const msg: Notification = JSON.parse(message.body);
              this.store.dispatch(new AddNotification(msg));
            });
        }
      });
  }
}
