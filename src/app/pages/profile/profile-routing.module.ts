import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {UserInfoComponent} from './userinfo/user.info.component';
import {UserListComponent} from './userlist/user.list.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: 'profile',
      component: UserInfoComponent,
    },
    {
      path: 'list',
      component: UserListComponent,
    },
    {
      path: '',
      redirectTo: 'profile',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
