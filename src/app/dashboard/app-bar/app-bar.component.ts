import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';

import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.css'],
})
export class AppBarComponent implements OnInit {
  @Input() sidenav: MatSidenav;
  @Input() isMobile: boolean;

  private sidenavSub: Subscription;
  public sidenavOpened: boolean = false;
  public linkText: boolean = false;

  ngOnInit(): void {
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

  constructor(private _sidenavService: SidenavService) {}

  ngOnDestroy(): void {
    this.sidenavSub.unsubscribe();
  }
}
