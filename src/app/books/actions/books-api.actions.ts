import { createAction, props } from '@ngrx/store';
import { Book } from '../models/book';

export const loadSuccess = createAction(
  '[Books API] Load Success',
  props<{ payload: Book[] }>()
);

export const loadFail = createAction(
  '[Books API] Load Fail',
  props<{ payload: any }>()
);
