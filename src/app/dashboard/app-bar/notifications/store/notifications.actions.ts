import { Action } from '@ngrx/store';
import { Notification } from '../../../../models/notification';

export const ADD_NOTIFICATION = 'ADD_NOTIFICATION';
export const ADD_NOTIFICATIONS = 'ADD_NOTIFICATIONS';
export const UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION';

export class AddNotification implements Action {
  readonly type = ADD_NOTIFICATION;

  constructor(public payload: Notification) {}
}

export class AddNotifications implements Action {
  readonly type = ADD_NOTIFICATIONS;

  constructor(public payload: Notification[]) {}
}

export class UpdateNotification implements Action {
  readonly type = UPDATE_NOTIFICATION;

  constructor(public payload: { index: number; notification: Notification }) {}
}

export type RoleNotSetActions =
  | AddNotification
  | AddNotifications
  | UpdateNotification;
