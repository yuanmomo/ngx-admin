import { NgModule } from '@angular/core';
import {NbMenuModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import {ProxyDownloadModule} from './proxy-download/proxy.download.module';
import {ProfileModule} from './profile/profile.module';
import {UserService} from '../@core/impl/users.service';
import {FileListService} from '../@core/impl/file.list.service';
import {UserData} from '../@core/data/users';
import {FileListData} from '../@core/data/file.list';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ProfileModule,
    ProxyDownloadModule,
  ],
  declarations: [
    PagesComponent,
  ],
  providers: [
    // ...
    {provide: UserData, useClass: UserService},
    {provide: FileListData, useClass: FileListService},
  ],
})
export class PagesModule {
}
