import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ComponentsModule } from './components';
import { MaterialModule } from '../material';

import { reducers } from './reducers';
import { BooksPageEffects } from './effects/books-page.effects';
import { BooksPageComponent } from './components/books-page.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    RouterModule.forChild([
      { path: '', component: BooksPageComponent },
    ]),
    StoreModule.forFeature('books', reducers),
    EffectsModule.forFeature([BooksPageEffects]),
  ]
})
export class BooksModule {}
