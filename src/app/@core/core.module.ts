import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
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
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FileListService} from './impl/file.list.service';
import {FileListData} from './data/file.list';
import {MockFileService} from './mock/mock-file.service';

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
    {provide: FileListData, useClass: MockFileService},
  );
} else {
  DATA_SERVICES.push(
    {provide: UserData, useClass: UserService},
    {provide: FileListData, useClass: FileListService},
  );
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
);

@NgModule({
  imports: [
    CommonModule,
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
