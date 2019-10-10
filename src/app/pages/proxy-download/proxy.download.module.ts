import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbInputModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { ProxyDownloadComponent } from './proxy.download.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
  ],
  declarations: [
    ProxyDownloadComponent,
  ],
})
export class ProxyDownloadModule { }
