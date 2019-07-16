import { createAction, props } from '@ngrx/store';

export const login = createAction('[Login Page] Login');

export const loginComplete = createAction('[Login Page] Login Complete');

export const loginSuccess = createAction('[Auth API] Login Success');

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ payload: any }>()
);

export const checkLogin = createAction('[Auth] Check Login');

export const logout = createAction('[Auth] Confirm Logout');

export const logoutConfirmed = createAction('[Auth] Logout Confirmed');

export const logoutCancelled = createAction('[Auth] Logout Cancelled');
