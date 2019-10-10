import { NgModule } from '@angular/core';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ProxyDownloadComponent } from './proxy.download.component';

@NgModule({
  imports: [
    NbCardModule,
    ThemeModule,
  ],
  declarations: [
    ProxyDownloadComponent,
  ],
})
export class ProxyDownloadModule { }
