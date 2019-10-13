import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {NbAuthJWTToken, NbAuthModule, NbDummyAuthStrategy, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbSecurityModule, NbRoleProvider} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {CommonModule} from '../common/common.module';
import {httpInterceptorProviders} from '../common/interceptors';

import {environment} from '../../environments/environment';

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


const DATA_SERVICES = [];
if (environment.mockData) {
  DATA_SERVICES.push(
    {provide: UserData, useClass: MockUserService},
  );
} else {
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
} else {
  NB_CORE_PROVIDERS.push(
    ...ImplModule.forRoot().providers,
  );
}

// const baseFormSetting: any = {
//   redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
//   strategy: 'email',  // strategy id key.
//   showMessages: {     // show/not show success/error messages
//     success: true,
//     error: true,
//   },
// };


NB_CORE_PROVIDERS.push(
  ...CommonModule.forRoot().providers,
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: '/api/auth/',
        login: {
          endpoint: 'login',
          redirect: {
            success: '/backend/',
            failure: null, // stay on the same page
          },
        },
        register: {
          endpoint: 'register',
          redirect: {
            success: '/backend/',
            failure: null, // stay on the same page
          },
        },
        token: {
          class: NbAuthJWTToken,
          key: 'value',
        },
      }),
    ],
    forms: {
      login: {
        redirectDelay: 500, // delay before redirect after a successful login, while success message is shown to the user
        strategy: 'email',  // strategy id key.
        showMessages: {     // show/not show success/error messages
          success: true,
          error: true,
        },
        rememberMe: true,   // whether to show or not the `rememberMe` checkbox
      },
      register: {
        redirectDelay: 500,
        strategy: 'email',
        showMessages: {
          success: true,
          error: true,
        },
        terms: false,
      },
      logout: {
        redirectDelay: 0,
        strategy: 'email',
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
