import { NgModule } from '@angular/core';
import {NbButtonModule, NbCardModule, NbInputModule, NbListComponent, NbListModule, NbUserModule} from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import {FormsModule} from '@angular/forms';
import {ClipboardModule} from 'ngx-clipboard';
import {ProfileComponent} from './profile.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {UserInfoComponent} from './userinfo/user.info.component';
import {UserListComponent} from './userlist/user.list.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {UserService} from '../../@core/impl/users.service';
import {UserData} from '../../@core/data/users';

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
    ProfileRoutingModule,
  ],
  declarations: [
    ProfileComponent,
    UserInfoComponent,
    UserListComponent,
  ],
  providers: [
    // ...
    {provide: UserData, useClass: UserService},
  ],
})
export class ProfileModule { }
