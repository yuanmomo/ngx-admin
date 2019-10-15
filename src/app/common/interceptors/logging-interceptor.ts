import { finalize, tap } from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {Router} from '@angular/router';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const started = Date.now();
    let ok: string;

    // extend server response observable with logging
    return next.handle(req)
      .pipe(
        tap(
          // Succeeds when there is a response; ignore other events
          event => ok = event instanceof HttpResponse ? 'succeeded' : '',
          // Operation failed; error is an HttpErrorResponse
          error => ok = 'failed',
        ),
        // Log when response observable either completes or errors
        finalize(() => {
          const elapsed = Date.now() - started;
          const msg = `${req.method} "${req.urlWithParams}"
             ${ok} in ${elapsed} ms.`;
          if (!environment.production) {
            console.log(msg);
          }
          // if (ok = 'failed') { // 网络问题，跳转到登陆页面
          //   this.router.navigate(['/auth/login']);
          // }
        }),
      );
  }
}
