import { on, createReducer } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Book } from '../models/book';
import * as BooksApiActions from '../actions/books-api.actions';

export interface State extends EntityState<Book> {}

export const adapter: EntityAdapter<Book> = createEntityAdapter<Book>({
  selectId: (book: Book) => book.id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState();

export const reducer = createReducer(
  initialState,
  on(BooksApiActions.loadSuccess, (state, { payload }) =>
    adapter.addAll(payload, state)
  )
);

export const {
  selectIds: getBookIds,
  selectEntities: getBookEntities,
  selectAll: getAllBooks,
  selectTotal: getTotalBooks
} = adapter.getSelectors();
