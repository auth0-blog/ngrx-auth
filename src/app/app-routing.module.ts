import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'books', loadChildren: '@app/books/books.module#BooksModule' },
      { path: '', pathMatch: 'full', redirectTo: '/home' }
    ]),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
