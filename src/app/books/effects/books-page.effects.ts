import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, exhaustMap } from 'rxjs/operators';

import { BooksPageActionTypes } from './../actions/books-page.actions';
import { LoadSuccess, LoadFail } from './../actions/books-api.actions';
import { GoogleBooksService } from '@app/services/google-books';
import { Book } from '../models/book';

@Injectable()
export class BooksPageEffects {
  loadCollection$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksPageActionTypes.Load),
      exhaustMap(() =>
        this.googleBooksService
          .searchBooks('oauth')
          .pipe(
            map(
              (books: Book[]) => new LoadSuccess(books),
              catchError(error => of(new LoadFail(error)))
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
