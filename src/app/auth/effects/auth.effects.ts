import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { tap, exhaustMap, map, catchError } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import * as fromAuth from '../actions/auth.actions';
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';
import { AuthService } from '@app/auth/services/auth.service';
import { of, empty } from 'rxjs';

@Injectable()
export class AuthEffects {
  @Effect({ dispatch: false })
  login$ = this.actions$.ofType<fromAuth.Login>(fromAuth.AuthActionTypes.Login).pipe(
    tap(() => {
      return this.authService.login();
    })
  );

  @Effect()
  loginComplete$ = this.actions$
    .ofType<fromAuth.Login>(fromAuth.AuthActionTypes.LoginComplete)
    .pipe(
      exhaustMap(() => {
        return this.authService.parseHash$().pipe(
          map((authResult: any) => {
            if (authResult && authResult.accessToken) {
              this.authService.setAuth(authResult);
              window.location.hash = '';
              return new fromAuth.LoginSuccess();
            }
          }),
          catchError(error => of(new fromAuth.LoginFailure(error)))
        );
      })
    );

  @Effect({ dispatch: false })
  loginRedirect$ = this.actions$
    .ofType<fromAuth.LoginSuccess>(fromAuth.AuthActionTypes.LoginSuccess)
    .pipe(
      tap(() => {
        this.router.navigate([this.authService.authSuccessUrl]);
      })
    );

  @Effect({ dispatch: false })
  loginErrorRedirect$ = this.actions$
    .ofType<fromAuth.LoginFailure>(fromAuth.AuthActionTypes.LoginFailure)
    .pipe(
      map(action => action.payload),
      tap((err: any) => {
        if (err.error_description) {
          console.error(`Error: ${err.error_description}`);
        } else {
          console.error(`Error: ${JSON.stringify(err)}`);
        }
        this.router.navigate([this.authService.authFailureUrl]);
      })
    );

  @Effect()
  checkLogin$ = this.actions$.ofType<fromAuth.CheckLogin>(fromAuth.AuthActionTypes.CheckLogin).pipe(
    exhaustMap(() => {
      if (this.authService.authenticated) {
        return this.authService.checkSession$({}).pipe(
          map((authResult: any) => {
            if (authResult && authResult.accessToken) {
              this.authService.setAuth(authResult);
              return new fromAuth.LoginSuccess();
            }
          }),
          catchError(error => {
            this.authService.resetAuthFlag();
            return of(new fromAuth.LoginFailure({ error }));
          })
        );
      } else {
        return empty();
      }
    })
  );

  @Effect()
  logoutConfirmation$ = this.actions$.ofType<fromAuth.Logout>(fromAuth.AuthActionTypes.Logout).pipe(
    exhaustMap(() =>
      this.dialogService
        .open(LogoutPromptComponent)
        .afterClosed()
        .pipe(
          map(confirmed => {
            if (confirmed) {
              return new fromAuth.LogoutConfirmed();
            } else {
              return new fromAuth.LogoutCancelled();
            }
          })
        )
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$
    .ofType<fromAuth.LogoutConfirmed>(fromAuth.AuthActionTypes.LogoutConfirmed)
    .pipe(tap(() => this.authService.logout()));

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog
  ) {}
}
