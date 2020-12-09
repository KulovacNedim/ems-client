import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  onSideNavChange,
  onMainContentChange,
  animateText,
} from '../../app/dashboard/left-menu/animations';

import { MediaMatcher } from '@angular/cdk/layout';
import { SidenavService } from '../services/sidenav.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [onSideNavChange, animateText, onMainContentChange],
})
export class DashboardComponent implements OnInit, OnDestroy {
  private navStateSub: Subscription;
  // private itemTextSub: Subscription;
  public sidenavOpened: boolean = false;
  // public linkText: boolean;

  ngOnInit() {
    this.navStateSub = this._sidenavService.isSidenavOpend.subscribe(
      (navOpened) => (this.sidenavOpened = navOpened)
    );
  }

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _sidenavService: SidenavService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }
}
