import * as fromNotifications from '../dashboard/app-bar/notifications/store/notifications.reducer';
import * as fromAuth from '../auth/auth/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  notifications: fromNotifications.State;
  auth: fromAuth.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  notifications: fromNotifications.notificationsReducer,
  auth: fromAuth.authReducer,
};
