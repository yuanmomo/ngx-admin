import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Result} from './dto';
import {Router} from '@angular/router';
import {ToastUtilService} from './toast.util';
import {NbGlobalPhysicalPosition} from '@nebular/theme';


@Injectable()
export class HttpUtilService {
  public urlHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  public jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public serverUrl: string = environment.serverUrl;
  public urlRegExp = new RegExp('^http(s)?://.*');

  constructor(
    public http: HttpClient,
    private router: Router,
    private toastUtil: ToastUtilService,
  ) {
  }


  /**
   * @param {path:string,param:{a:1}},
   */
  public doGet(req): Observable<any> {
    return this.get(req).pipe(map((result: Result<any>) => {
      return this.handleResult(result);
    }));
  }

  /**
   * @param {path:string,param:{a:1}},
   */
  public doPost(p): Observable<any> {
    return this.doPost(p).pipe(map((result: Result<any>) => {
      return this.handleResult(result);
    }));
  }

  /**
   * @param {path:string,param:{a:1}},
   */
  public doPostJson(p): Observable<any> {
    return this.doPostJson(p).pipe(map((result: Result<any>) => {
      return this.handleResult(result);
    }));
  }

  public handleResult(result: any): Observable<any> {
    if (result.code === 0) {
      return result.value;
    } else if (result.code === -1) {
      // error
      if (console && console.error) {
        console.error(result.message);
      }
      this.toastUtil.showErrorToast1s(NbGlobalPhysicalPosition.TOP_RIGHT, '错误', result.message);
    } else if (result.code === -99999) {
      // no login
      if (this.router.url.indexOf('/auth/login') < 0) {
        // this.router.navigate(["/auth/login", {"url": this.router.url}]);
        this.router.navigate(['/auth/login']);
      } else {
        // 正在login 页
        this.toastUtil.showErrorToast1s(NbGlobalPhysicalPosition.TOP_RIGHT, '错误', '登录页错误：' + result.message);
      }
    }
    this.toastUtil.showErrorToast1s(NbGlobalPhysicalPosition.TOP_RIGHT, '错误', '请求出现未知错误');
  }


  public corsGet<T>(req): Observable<T> {
    return this.http.get<T>(this.getUrl(req.path),
      {
        headers: req.headers ? req.headers : this.urlHeaders,
        withCredentials: true,
      }).pipe(
      // retry(3),
      catchError(this.handleError),
    );
  }

  public corsPost<T>(req): Observable<T> {
    let usp: HttpParams = new HttpParams();
    if (req.param) {
      for (const key of Object.keys(req.param)) {
        usp = usp.append(key, <string>req.param[key]);
      }
    }
    return this.http.post<T>(this.getUrl(req.path), usp, {
      headers: req.headers ? req.headers : this.urlHeaders,
      withCredentials: true,
    }).pipe(
      // retry(3),
      catchError(this.handleError),
    );
  }

  private get(req): Observable<Result<any>> {
    return this.http.get<Result<any>>(this.getUrl(req.path),
      {params: req.param, headers: req.headers ? req.headers : this.urlHeaders, withCredentials: true})
      .pipe(
        // retry(3),
        catchError(this.handleError),
      );
  }

  private post(req): Observable<Result<any>> {
    let usp: HttpParams = new HttpParams();
    if (req.param) {
      for (const key of Object.keys(req.param)) {
        usp = usp.append(key, <string>req.param[key]);
      }
    }
    return this.http.post<Result<any>>(this.getUrl(req.path), usp, {
      headers: req.headers ? req.headers : this.urlHeaders,
      withCredentials: true,
    }).pipe(
      // retry(3),
      catchError(this.handleError),
    );
  }

  /**
   * p['param'] 内放JSON对象
   * @param p
   * @returns {Observable<A>}
   */
  private postJson(req): Observable<Result<any>> {
    return this.http.post<Result<any>>(this.getUrl(req.path), req.param, {
      headers: req.headers ? req.headers : this.jsonHeaders,
      withCredentials: true,
    }).pipe(
      // retry(3),
      catchError(this.handleError),
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
        + ` msg : ${error.message}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  public getUrl(path: string): string {
    return this.urlRegExp.test(path) ? path : this.serverUrl + path;
  }

  public isUrl(url: string): boolean {
    return this.urlRegExp.test(url);
  }

}
