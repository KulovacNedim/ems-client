import { Action } from '@ngrx/store';

import { User } from '../user';

export const SIGN_IN = '[Authentication] SIGN_IN';
export const SIGN_UP = '[Authentication] SIGN_UP';
export const SIGN_OUT = '[Authentication] SIGN_OUT';
export const SET_AUTHENTICATED_USER = '[Authentication] SET_AUTHENTICATED_USER';

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: User) {}
}

export class SignUp implements Action {
  readonly type = SIGN_UP;

  constructor(public payload: User) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SetAuthenticatedUser implements Action {
  readonly type = SET_AUTHENTICATED_USER;

  constructor(public payload: User) {}
}

export type AuthActions = SignIn | SignUp | SignOut | SetAuthenticatedUser;
