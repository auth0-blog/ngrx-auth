import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActionTypes } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

  // @Effect()
  // loadFoos$ = this.actions$.pipe(ofType(AuthActionTypes.LoadAuths));

  constructor(private actions$: Actions) {}
}
