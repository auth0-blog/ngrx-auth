import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import * as BooksPageActions from './../actions/books-page.actions';
import * as BooksApiActions from './../actions/books-api.actions';
import { GoogleBooksService } from '@app/services/google-books';
import { Book } from '../models/book';

@Injectable()
export class BooksPageEffects {
  loadCollection$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActions.load),
      exhaustMap(() =>
        this.googleBooksService
          .searchBooks('oauth')
          .pipe(
            map(
              (books: Book[]) =>
                BooksApiActions.loadSuccess({ payload: books }),
              catchError(error => of(BooksApiActions.loadFail(error)))
            )
          )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private googleBooksService: GoogleBooksService
  ) {}
}
