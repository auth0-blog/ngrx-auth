import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule } from '@angular/material';

import { AuthRoutingModule } from './auth-routing.module';
import { UserHomeComponent } from './components/user-home.component';
import { AuthEffects } from './effects/auth.effects';
import { LoginPageComponent } from './components/login-page.component';
import { LoginFormComponent } from './components/login-form.component';
import { CallbackComponent } from './components/callback.component';
import { LogoutPromptComponent } from './components/logout-prompt.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects])
  ],
  declarations: [UserHomeComponent, LoginPageComponent, LoginFormComponent, CallbackComponent, LogoutPromptComponent],
  entryComponents: [LogoutPromptComponent]
})
export class AuthModule {}
