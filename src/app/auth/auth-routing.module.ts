import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHomeComponent } from './components/user-home.component';
import { LoginPageComponent } from '@app/auth/components/login-page.component';
import { CallbackComponent } from '@app/auth/components/callback.component';
import { AuthGuard } from './services/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      { path: 'callback', component: CallbackComponent },
      {
        path: 'home',
        component: UserHomeComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
