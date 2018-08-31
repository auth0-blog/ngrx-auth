import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as fromStore from '@app/state';
import { Store } from '@ngrx/store';
import { Logout } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'abl-user-home',
  template: `
  <div>
    <h3>Welcome Home!</h3>
    <button mat-button raised color="accent" (click)="goToBooks()">See my book collection</button>
    <button mat-button raised color="accent" (click)="logout()">Log Out</button>
  </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 128px 0 0 0;
      }

      div {
        width: 100%;
        min-width: 250px;
        max-width: 300px;
      }
    `
  ]
})
export class UserHomeComponent {
  constructor(private store: Store<fromStore.State>, private router: Router) {}

  goToBooks() {
    this.router.navigate(['/books']);
  }

  logout() {
    this.store.dispatch(new Logout());
  }
}
