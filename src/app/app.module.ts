/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {CoreModule} from './@core/core.module';
import {ThemeModule} from './@theme/theme.module';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {
  // NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {ClipboardModule} from 'ngx-clipboard';
import {AuthGuard} from './auth/auth-guard.service';
import {
  getDeepFromObject,
  NbAuthModule,
  NbAuthSimpleToken,
  NbPasswordAuthStrategy,
  NbPasswordAuthStrategyOptions,
} from '@nebular/auth';
import {UrlConfig} from './url-config';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {of as observableOf} from 'rxjs';
import {UserData} from './@core/data/users';
import {UserService} from './@core/impl/users.service';
import {FileListService} from './@core/impl/file.list.service';

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}


export function getToken(module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) {
  return getDeepFromObject(
    res.body,
    options.token.key,
  );
}

export function getMessage(module: string, res: HttpResponse<Object>, options: NbPasswordAuthStrategyOptions) {
  if (res.body['code'] !== 0) {
    return res.body['message'];
  }
  return getDeepFromObject(
    res.body,
    options.messages.key,
    options[module].defaultMessages,
  );
}

export function getError(module: string, res: HttpErrorResponse, options: NbPasswordAuthStrategyOptions) {
  return getDeepFromObject(
    res.error,
    options.errors.key,
    options[module].defaultErrors,
  );
}


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,

    ClipboardModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    // NbChatModule.forRoot({
    //   messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    // }),
    CoreModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: '',
          login: {
            endpoint: UrlConfig.LOGIN_URL,
            method: 'POST',
            redirect: {
              success: '/backend/',
              failure: '/auth/login', // stay on the same page
            },
            requireValidToken: true,
            // defaultMessages: ['Login Failed'],
          },
          register: {
            endpoint: UrlConfig.REGISTER_URL,
            method: 'POST',
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
            getter: getToken,
          },
          messages: {
            key: 'message',
            getter: getMessage,
          },
          errors: { // http 返回的 code 不能为 200
            key: 'message',
            getter: getError,
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
    }),
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
    }),
  ],
  providers: [
    // ...
    AuthGuard,
    {provide: NbRoleProvider, useClass: NbSimpleRoleProvider},
  ],
  exports: [
    NbAuthModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {

}
