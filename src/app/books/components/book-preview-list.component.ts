import { Component, Input } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'abl-book-preview-list',
  template: `
    <abl-book-preview *ngFor="let book of books" [book]="book"></abl-book-preview>
  `,
  styles: [
    `
    :host {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }
  `,
  ],
})
export class BookPreviewListComponent {
  @Input() books: Book[];
}
