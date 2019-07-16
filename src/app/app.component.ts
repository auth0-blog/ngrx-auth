import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/state';
import { checkLogin } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'abl-root',
  template: `
    <mat-sidenav-container fullscreen>
      <mat-sidenav></mat-sidenav>
      <mat-sidenav-content>
        <mat-toolbar color="primary">
          <span>Auth0 Book Library</span>
          <span class="spacer"></span>
        </mat-toolbar>

        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .spacer {
        flex: 1 1 auto;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(checkLogin());
  }
}
