import * as RoleNotSetActions from './notifications.actions';
import { Notification } from '../../../../models/notification';

export interface State {
  notifications: Notification[];
  tasks: Notification[];
}

const initialState: State = {
  notifications: [],
  tasks: [],
};

export const notificationsReducer = (
  state: State = initialState,
  action: RoleNotSetActions.RoleNotSetActions
) => {
  switch (action.type) {
    case RoleNotSetActions.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: action.payload.userToNotify
          ? [...state.notifications]
          : [...state.notifications, action.payload],
        tasks: action.payload.userToNotify
          ? [...state.tasks, action.payload]
          : [...state.tasks],
      };

    case RoleNotSetActions.ADD_NOTIFICATIONS:
      const notifications: Notification[] = [];
      const tasks = [];
      action.payload.map((notification) => {
        notification.userToNotify
          ? tasks.push(notification)
          : notifications.push(notification);
      });
      return {
        ...state,
        notifications: [...state.notifications, ...notifications],
        tasks: [...state.tasks, ...tasks],
      };

    case RoleNotSetActions.UPDATE_NOTIFICATION:
      // not doing anything at the moment
      return {
        ...state,
      };
    default:
      return state;
  }
};
