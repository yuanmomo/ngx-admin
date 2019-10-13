import {Injectable} from '@angular/core';
import {HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class CrosInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      withCredentials: true,
    });

    console.log(`withCredentials ${authReq.withCredentials}`);

    // send cloned request with header to the next handler.
    return next.handle(authReq);
  }
}
