import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {NbAuthService, NbAuthToken} from '@nebular/auth';
import {tap} from 'rxjs/operators';
import {exitCodeFromResult} from '@angular/compiler-cli';
import {isBoolean} from 'util';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: NbAuthService,
              private router: Router,
  ) {
  }

  isAuthenticated: Boolean;
  authToken: NbAuthToken;

  canActivate() {
    this.authService.isAuthenticated().subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
      });

    console.info(`isAuthenticated : ${this.isAuthenticated}; token : ${JSON.stringify(this.authToken)}`);

    if (!this.isAuthenticated) {
      this.router.navigate(['auth/login']);
      return false;
    }

    this.authService.getToken().subscribe(
      (token) => {
        this.authToken = token;
      });

    return true;
  }
}
