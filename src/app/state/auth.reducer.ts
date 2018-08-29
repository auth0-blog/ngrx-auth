import { AuthActions, AuthActionTypes } from '@app/auth/actions/auth.actions';

export interface State {
  isLoggedIn: boolean;
}

export const initialState: State = {
  isLoggedIn: false
};

export function reducer(state = initialState, action: AuthActions): State {
  switch (action.type) {
    case AuthActionTypes.LoginSuccess:
      return { ...state, isLoggedIn: true };

    case AuthActionTypes.LogoutConfirmed:
      return initialState; // the initial state has isLoggedIn set to false

    default:
      return state;
  }
}

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
