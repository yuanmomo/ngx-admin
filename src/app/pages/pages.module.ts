import { NgModule } from '@angular/core';
import {NbInputModule, NbMenuModule} from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import {ProxyDownloadModule} from './proxy-download/proxy.download.module';
import {ProfileModule} from './profile/profile.module';

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
})
export class PagesModule {
}
