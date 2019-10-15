import {of as observableOf, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {User, UserData} from '../data/users';
import {HttpUtilService} from '../../common/http.util.service';
import {UrlConfig} from '../../url-config';

@Injectable()
export class UserService extends UserData {


  constructor(private httpUtil: HttpUtilService) {
    super();
  }

  getUserInfo(): Observable<User> {
    return this.httpUtil.doGet({path: UrlConfig.GET_USER_INFO});
  }
}
