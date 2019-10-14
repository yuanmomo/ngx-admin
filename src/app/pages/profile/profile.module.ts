import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbInputModule, NbListComponent, NbListModule, NbUserModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {ListComponent} from './list/list.component';

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
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    ListComponent,
  ],
})
export class ProfileModule { }
