/* "Barrel" of Http Interceptors */
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoggingInterceptor} from './logging-interceptor';
import {CrosInterceptor} from './cros.interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: CrosInterceptor, multi: true},
  // {provide: HTTP_INTERCEPTORS, useClass: SecurityInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true},
];
