import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbSecurityModule, NbRoleProvider} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {CommonModule} from '../common/common.module';
import {httpInterceptorProviders} from '../common/interceptors';

import { environment } from '../../environments/environment';

import {UserData} from './data/users';

import {MockDataModule} from './mock/mock-data.module';
import {ImplModule} from './impl/impl.module';

import {MockUserService} from './mock/mock-users.service';
import {UserService} from './impl/users.service';

const socialLinks = [
  // {
  //   url: 'https://github.com/akveo/nebular',
  //   target: '_blank',
  //   icon: 'github',
  // },
  // {
  //   url: 'https://www.facebook.com/akveo/',
  //   target: '_blank',
  //   icon: 'facebook',
  // },
  // {
  //   url: 'https://twitter.com/akveo_inc',
  //   target: '_blank',
  //   icon: 'twitter',
  // },
];


const DATA_SERVICES = [ ];
if (environment.mockData) {
  DATA_SERVICES.push(
      {provide: UserData, useClass: MockUserService},
  );
}else {
  DATA_SERVICES.push(
    {provide: UserData, useClass: UserService},
  );
}

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [];
if (environment.mockData) {
  NB_CORE_PROVIDERS.push(
    ...MockDataModule.forRoot().providers,
  );
}else {
  NB_CORE_PROVIDERS.push(
    ...ImplModule.forRoot().providers,
  );
}

NB_CORE_PROVIDERS.push(
  ...CommonModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
      }),
    ],
    forms: {
      login: {
        socialLinks: socialLinks,
      },
      register: {
        socialLinks: socialLinks,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
);

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        httpInterceptorProviders,
      ],
    };
  }
}
