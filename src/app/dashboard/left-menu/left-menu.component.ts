import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { onSideNavChange, animateText } from './animations';
import { SidenavService } from '../../services/sidenav.service';

interface Page {
  link: string;
  name: string;
  icon: string;
  pages: any[];
}

interface NavItem {
  displayName: string;
  disabled?: boolean;
  iconName: string;
  route?: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css'],
  animations: [onSideNavChange, animateText],
})
export class LeftMenuComponent implements OnInit, OnDestroy {
  private navStateSub: Subscription;
  private itemTextSub: Subscription;
  public sidenavOpened: boolean = false;
  public linkText: boolean;
  private panelOpenState = false;

  constructor(private _sidenavService: SidenavService) {}

  ngOnInit() {
    this.navStateSub = this._sidenavService.isSidenavOpend.subscribe(
      (navOpened) => (this.sidenavOpened = navOpened)
    );

    this.itemTextSub = this._sidenavService.isItemTextShown.subscribe(
      (itemTextVisiable) => (this.linkText = itemTextVisiable)
    );
  }

  ngOnDestroy() {
    this.navStateSub.unsubscribe();
    this.itemTextSub.unsubscribe();
  }

  public navItems: Page[] = [
    { name: 'Inbox', link: 'some-link', icon: 'inbox', pages: [] },
    { name: 'Starred', link: 'some-link', icon: 'send', pages: [] },
    {
      name: 'Starred1',
      link: 'some-link',
      icon: 'send',
      pages: [
        {
          title: 'Subpage',
          link: '/settings/advanced',
          icon: 'send',
        },
        {
          title: 'Subpage',
          link: '/settings/advanced',
          icon: 'send',
        },
      ],
    },
    {
      name: 'Starred22222',
      link: 'some-link',
      icon: 'send',
      pages: [
        {
          title: 'Subpage',
          link: '/settings/advanced',
          icon: 'send',
        },
        {
          title: 'Subpage',
          link: '/settings/advanced',
          icon: 'dashboard',
        },
      ],
    },
  ];
}
