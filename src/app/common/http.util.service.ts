import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Result} from './dto';
import {User} from '../@core/data/users';


@Injectable()
export class HttpUtilService {
  public urlHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
  public jsonHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  public serverUrl: string = environment.serverUrl;
  private urlRegExp = new RegExp('^http(s)?://.*');

  constructor(
    public http: HttpClient,
  ) {
  }

  public corsGet<T>(req): Observable<T> {
    return this.http.get<T>(this.getUrl(req.path),
      {
        params: req.param,
        headers: req.headers ? req.headers : this.urlHeaders,
        withCredentials: true,
      }).pipe(
      // retry(3),
      catchError(this.handleError),
    );
  }


  public get(req): Observable<Result<any>> {
    return this.http.get<Result<any>>(this.getUrl(req.path),
      {params: req.param, headers: req.headers ? req.headers : this.urlHeaders, withCredentials: true})
      .pipe(
        // retry(3),
        catchError(this.handleError),
      );
  }

  public post(req): Observable<Result<any>> {
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
  public postJson(req): Observable<Result<any>> {
    return this.http.post<Result<any>>(this.getUrl(req.path), req.param, {
      headers: req.headers ? req.headers : this.jsonHeaders,
      withCredentials: true,
    }).pipe(
      // retry(3),
      catchError(this.handleError),
    );
  }

  public handleError(error: HttpErrorResponse) {
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
}
