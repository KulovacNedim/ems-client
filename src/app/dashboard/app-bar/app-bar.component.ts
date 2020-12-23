import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Subscription } from 'rxjs';
import { Message } from '@stomp/stompjs';

import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() isMobile: boolean;
  topicSubscription: Subscription;

  private sidenavSub: Subscription;
  public sidenavOpened: boolean = false;
  public linkText: boolean = false;

  ngOnInit(): void {
    // get notifications
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.http
      .get('http://localhost:8080/api/my-notifications', httpOptions)
      .subscribe(
        (succ) => console.log(succ),
        (err) => console.log(err)
      );
    // subscribe for new notifications
    this.topicSubscription = this.rxStompService
      .watch('/topic/notifications')
      .subscribe((message: Message) => {
        console.log(message.body);
      });

    this.sidenavSub = this._sidenavService.isSidenavOpend.subscribe(
      (navOpened) => (this.sidenavOpened = navOpened)
    );
    if (this.isMobile) {
      this._sidenavService.sidenavOpened.next(true);
      this._sidenavService.showItemText.next(true);
    }
  }

  toggleSidenav() {
    if (!this.isMobile) {
      this.sidenavOpened = !this.sidenavOpened;
      setTimeout(() => {
        this._sidenavService.showItemText.next(this.sidenavOpened);
      }, 50);
      this._sidenavService.sidenavOpened.next(this.sidenavOpened);
    } else {
      this.sidenav.toggle();
    }
  }

  constructor(
    private _sidenavService: SidenavService,
    private http: HttpClient,
    private rxStompService: RxStompService
  ) {
    this.rxStompService.configure({
      connectHeaders: {
        Authorization: localStorage.getItem('token'),
      },
    });
  }

  ngOnDestroy(): void {
    this.sidenavSub.unsubscribe();
    this.topicSubscription.unsubscribe();
  }
}
