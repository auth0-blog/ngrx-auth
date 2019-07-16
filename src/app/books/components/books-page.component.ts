import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BooksPageActions from '../actions/books-page.actions';
import { Book } from '../models/book';
import * as fromBooks from '../reducers';
import { logout } from '@app/auth/actions/auth.actions';

@Component({
  selector: 'abl-books-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Collection</mat-card-title>
      <mat-card-actions>
        <button mat-button raised color="accent" (click)="logout()">
          Logout
        </button>
      </mat-card-actions>
    </mat-card>

    <abl-book-preview-list [books]="books$ | async"></abl-book-preview-list>
  `,
  styles: [
    `
      mat-card-title {
        display: flex;
        justify-content: center;
      }

      mat-card-actions {
        display: flex;
        justify-content: center;
      }
    `
  ]
})
export class BooksPageComponent implements OnInit {
  books$: Observable<Book[]>;

  constructor(private store: Store<fromBooks.State>) {
    this.books$ = store.pipe(select(fromBooks.getAllBooks));
  }

  ngOnInit() {
    this.store.dispatch(BooksPageActions.load());
  }

  logout() {
    this.store.dispatch(logout());
  }
}
