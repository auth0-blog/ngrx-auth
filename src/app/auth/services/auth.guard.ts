import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap, map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '@app/auth/services/auth.service';
import * as fromStore from '@app/state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private store: Store<fromStore.State>,
    private router: Router
  ) {}

  canActivate() {
    return this.checkStoreAuthentication().pipe(
      mergeMap(storeAuth => {
        if (storeAuth) {
          return of(true);
        }

        return this.checkApiAuthentication();
      }),
      map(storeOrApiAuth => {
        if (!storeOrApiAuth) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
  }

  checkStoreAuthentication() {
    return this.store.select(fromStore.selectIsLoggedIn).pipe(take(1));
  }

  checkApiAuthentication() {
    return of(this.authService.authenticated);
  }
}
