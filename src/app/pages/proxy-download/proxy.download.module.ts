import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbInputModule, NbListComponent, NbListModule, NbUserModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import {DownloadComponent} from './download/download.component';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {ProxyDownloadRoutingModule} from './proxy.download-routing.module';
import {ListComponent} from './list/list.component';
import {ProxyDownloadComponent} from './proxy.download.componect';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbListModule,
    NbUserModule,
    FormsModule,
    ClipboardModule,
    NbUserModule,
    ProxyDownloadRoutingModule,
  ],
  declarations: [
    ProxyDownloadComponent,
    DownloadComponent,
    ListComponent,
  ],
})
export class ProxyDownloadModule { }
