import { UserResponse } from '../user';

export interface State {
  authUser: UserResponse;
  token: string;
}

const initialState = {
  authUser: null,
  token: null,
};

export const authReducer = (state = initialState, action) => {
  return state;
};
