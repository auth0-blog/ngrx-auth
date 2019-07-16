import * as AuthActions from '@app/auth/actions/auth.actions';
import { createReducer, on } from '@ngrx/store';

export interface State {
  isLoggedIn: boolean;
}

export const initialState: State = {
  isLoggedIn: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, state => ({ ...state, isLoggedIn: true })),
  on(AuthActions.logoutConfirmed, () => initialState) // the initial state has isLoggedIn set to false
);

export const selectIsLoggedIn = (state: State) => state.isLoggedIn;
