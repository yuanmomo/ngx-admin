import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbListModule,
  NbUserModule,
} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import {DownloadComponent} from './download/download.component';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {ProxyDownloadRoutingModule} from './proxy.download-routing.module';
import { ListComponent} from './list/list.component';
import {ProxyDownloadComponent} from './proxy.download.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ButtonViewComponent} from './list/button.view.component';

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
    Ng2SmartTableModule,
    ProxyDownloadRoutingModule,
  ],
  entryComponents: [
    ButtonViewComponent,
  ],

  declarations: [
    ProxyDownloadComponent,
    DownloadComponent,
    ListComponent,
    ButtonViewComponent,
  ],
})
export class ProxyDownloadModule { }
