import {finalize, tap} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let responseBody: string;
    return next.handle(req)
      .pipe(
        tap(
          event => {
            responseBody = event instanceof HttpResponse ? event.clone().body : '';
            // console.log(`result :  ${JSON.stringify(event)} ${JSON.stringify(responseBody)}`);
            if (responseBody !== ''
              && responseBody['code'] === -99999
            ) {
              this.router.navigate(['auth/login']);
            }
          },
        ),
      );
  }
}
