import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'abl-user-home',
  template: `
    <div>
      <h3>Welcome home!</h3>
      <button mat-button raised color="accent" (click)="goToBooks()">See my book collection</button>
    </div>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 128px 0 0 0;
      }

      div {
        width: 100%;
        min-width: 250px;
        max-width: 300px;
      }
    `
  ]
})
export class UserHomeComponent {

  constructor(private router: Router) { }

  goToBooks() {
    this.router.navigate(['/books']);
  }

}
