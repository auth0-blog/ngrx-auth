import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserHomeComponent } from './components/user-home.component';

@NgModule({
  imports: [
    RouterModule.forChild([{
      path: 'home',
      component: UserHomeComponent
    }])
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
