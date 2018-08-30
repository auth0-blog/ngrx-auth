import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHomeComponent } from './components/user-home.component';
import { LoginPageComponent } from '@app/auth/components/login-page.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'login', component: LoginPageComponent },
      {
        path: 'home',
        component: UserHomeComponent
      }
    ])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule {}
