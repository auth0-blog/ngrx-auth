import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/state';
import { Login } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'abl-login-page',
  template: `
    <abl-login-form
      (submitted)="onLogin($event)">
    </abl-login-form>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 128px 12px 12px 12px;
      }

      abl-login-form {
        width: 100%;
        min-width: 250px;
        max-width: 300px;
      }
    `
  ]
})
export class LoginPageComponent implements OnInit {
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {}

  onLogin() {
    this.store.dispatch(new Login());
  }
}
