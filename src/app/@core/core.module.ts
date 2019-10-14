import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {
  getDeepFromObject,
  // NbAuthJWTToken,
  NbAuthModule,
  NbAuthSimpleToken,
  // NbDummyAuthStrategy,
  NbPasswordAuthStrategy, NbPasswordAuthStrategyOptions,
} from '@nebular/auth';
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
import {UrlConfig} from '../url-config';
import {NbPasswordStrategyMessage} from '@nebular/auth/strategies/password/password-strategy-options';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FileListService} from './impl/file.list.service';

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
    {provide: FileList, useClass: FileListService},
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
        baseEndpoint: '',
        login: {
          endpoint: UrlConfig.LOGIN_URL,
          method : 'POST',
          redirect: {
            success: '/backend/',
            failure: '/auth/login', // stay on the same page
          },
          requireValidToken: true,
          // defaultMessages: ['Login Failed'],
        },
        register: {
          endpoint: UrlConfig.REGISTER_URL,
          method : 'POST',
          redirect: {
            success: '/auth/login',
            failure: null, // stay on the same page
          },
        },
        logout: {
          alwaysFail: false,
          endpoint: UrlConfig.LOGOUT_URL,
          method: 'POST',
          redirect: {
            success: '/auth/login',
            failure: null,
          },
        },
        token: {
          class: NbAuthSimpleToken,
          key: 'value', // this parameter tells where to look for the token
          getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => {
            return getDeepFromObject(
              res.body,
              options.token.key,
            );
          },
        },
        messages: {
          key: 'message',
          getter: (module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) => {
            if (res.body['code'] !== 0) {
              return res.body['message'];
            }
            return getDeepFromObject(
              res.body,
              options.messages.key,
              options[module].defaultMessages,
            );
          },
        },
        errors: { // http 返回的 code 不能为 200
          key: 'message',
          getter: (module: string, res: HttpErrorResponse, options: NbPasswordAuthStrategyOptions) => {
            // console.info(`error body ${JSON.stringify(res)}`);
            // console.info(`error msg body ${JSON.stringify(res.error['message'])}`);
            return getDeepFromObject(
              res.error,
              options.errors.key,
              options[module].defaultErrors,
            );
          },
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
        redirectDelay: 500,
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
