import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { tap, exhaustMap, map, catchError, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import * as fromAuth from '../actions/auth.actions';
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';
import { AuthService } from '@app/auth/services/auth.service';
import { of, EMPTY } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuth.AuthActionTypes.Login),
        tap(() => {
          return this.authService.login();
        })
      ),
    { dispatch: false }
  );

  loginComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActionTypes.LoginComplete),
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
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuth.AuthActionTypes.LoginSuccess),
        tap(() => {
          this.router.navigate([this.authService.authSuccessUrl]);
        })
      ),
    { dispatch: false }
  );

  loginErrorRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fromAuth.AuthActionTypes.LoginFailure),
        mergeMap(({ payload }) => payload),
        tap((err: any) => {
          if (err.error_description) {
            console.error(`Error: ${err.error_description}`);
          } else {
            console.error(`Error: ${JSON.stringify(err)}`);
          }
          this.router.navigate([this.authService.authFailureUrl]);
        })
      ),
    { dispatch: false }
  );

  checkLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActionTypes.CheckLogin),
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
          return EMPTY;
        }
      })
    )
  );

  logoutConfirmation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromAuth.AuthActionTypes.Logout),
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
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType<fromAuth.LogoutConfirmed>(
          fromAuth.AuthActionTypes.LogoutConfirmed
        ),
        tap(() => this.authService.logout())
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialogService: MatDialog
  ) {}
}
