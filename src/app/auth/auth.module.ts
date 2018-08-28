import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { UserHomeComponent } from './components/user-home.component';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [UserHomeComponent]
})
export class AuthModule { }
