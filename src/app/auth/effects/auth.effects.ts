import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, createEffect } from '@ngrx/effects';
import { tap, exhaustMap, map, catchError, mergeMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import * as AuthActions from '../actions/auth.actions';
import { LogoutPromptComponent } from '@app/auth/components/logout-prompt.component';
import { AuthService } from '@app/auth/services/auth.service';
import { of, EMPTY } from 'rxjs';

@Injectable()
export class AuthEffects {
  login$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        tap(() => this.authService.login())
      ),
    { dispatch: false }
  );

  loginComplete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginComplete),
      exhaustMap(() => {
        return this.authService.parseHash$().pipe(
          map((authResult: any) => {
            if (authResult && authResult.accessToken) {
              this.authService.setAuth(authResult);
              window.location.hash = '';
              return AuthActions.loginSuccess();
            }
          }),
          catchError(error => of(AuthActions.loginFailure(error)))
        );
      })
    )
  );

  loginRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate([this.authService.authSuccessUrl]);
        })
      ),
    { dispatch: false }
  );

  loginErrorRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
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
      ofType(AuthActions.checkLogin),
      exhaustMap(() => {
        if (this.authService.authenticated) {
          return this.authService.checkSession$({}).pipe(
            map((authResult: any) => {
              if (authResult && authResult.accessToken) {
                this.authService.setAuth(authResult);
                return AuthActions.loginSuccess();
              }
            }),
            catchError(error => {
              this.authService.resetAuthFlag();
              return of(AuthActions.loginFailure(error));
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
      ofType(AuthActions.logout),
      exhaustMap(() =>
        this.dialogService
          .open(LogoutPromptComponent)
          .afterClosed()
          .pipe(
            map(confirmed => {
              if (confirmed) {
                return AuthActions.logoutConfirmed();
              } else {
                return AuthActions.logoutCancelled();
              }
            })
          )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutConfirmed),
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
