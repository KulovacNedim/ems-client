import * as RoleNotSetActions from './notifications.actions';
import { Notification } from '../../../../models/notification';

export interface AppState {
  notifications: State;
}

export interface State {
  notifications: Notification[];
}

const initialState: State = {
  notifications: [],
};

export const notificationsReducer = (
  state: State = initialState,
  action: RoleNotSetActions.RoleNotSetActions
) => {
  switch (action.type) {
    case RoleNotSetActions.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };
    case RoleNotSetActions.ADD_NOTIFICATIONS:
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload],
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
