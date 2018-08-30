import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'abl-login-form',
  template: `
    <mat-card>
      <mat-card-title>
        Welcome
      </mat-card-title>
      <mat-card-content>
        <form [formGroup]="loginForm" (ngSubmit)="submit()">
          <div class="loginButtons">
            <button type="submit" mat-button>Log In</button>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }

      form {
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      mat-form-field {
        width: 100%;
        margin-bottom: 8px;
      }

      .loginButtons {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
      }
    `
  ]
})
export class LoginFormComponent implements OnInit {
  @Output() submitted = new EventEmitter<any>();

  loginForm = new FormGroup({});

  ngOnInit() {}

  submit() {
    this.submitted.emit();
  }
}
