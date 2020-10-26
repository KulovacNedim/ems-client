import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  public sidenavOpened = new BehaviorSubject<boolean>(false);
  public showItemText = new BehaviorSubject<boolean>(false);

  get isSidenavOpend() {
    return this.sidenavOpened.asObservable();
  }

  get isItemTextShown() {
    return this.showItemText.asObservable();
  }
}
