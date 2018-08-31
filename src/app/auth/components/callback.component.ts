import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromStore from '@app/state';
import { LoginComplete } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'abl-callback',
  template: `
    <p>
      Loading...
    </p>
  `,
  styles: []
})
export class CallbackComponent implements OnInit {
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.dispatch(new LoginComplete());
  }
}
