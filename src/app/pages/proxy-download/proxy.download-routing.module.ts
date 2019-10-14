import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListComponent} from './list/list.component';
import {DownloadComponent} from './download/download.component';
import {ProxyDownloadComponent} from './proxy.download.component';

const routes: Routes = [{
  path: '',
  component: ProxyDownloadComponent,
  children: [
    {
      path: 'download',
      component: DownloadComponent,
    },
    {
      path: 'list',
      component: ListComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProxyDownloadRoutingModule {
}
