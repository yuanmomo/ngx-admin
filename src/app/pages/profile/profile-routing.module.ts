import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile.component';
import {ListComponent} from './list/list.component';

const routes: Routes = [{
  path: '',
  component: ProfileComponent,
  children: [
    {
      path: 'profile',
      component: ListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {
}
