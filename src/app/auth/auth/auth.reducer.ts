import { User } from '../user';
import * as AuthActions from './auth.actions';

export interface State {
  authenticatedUser: User;
  token: string;
}

const initialState = {
  authenticatedUser: null,
  token: null,
};

export const authReducer = (
  state = initialState,
  action: AuthActions.AuthActions
) => {
  switch (action.type) {
    case AuthActions.SIGN_IN:
      // not doing anything at the moment
      return {
        ...state,
      };

    case AuthActions.SIGN_UP:
      // not doing anything at the moment
      return {
        ...state,
      };

    case AuthActions.SIGN_OUT:
      return {
        ...state,
        authenticatedUser: null,
        token: null,
      };

    case AuthActions.SET_AUTHENTICATED_USER:
      return {
        ...state,
        authUser: action.payload,
      };

    default:
      return state;
  }
};
