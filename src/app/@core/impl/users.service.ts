import {of as observableOf, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Contacts, RecentUsers, User, UserData} from '../data/users';
import {HttpUtilService} from '../../common/http.util.service';
import {angularClassDecoratorKeys} from 'codelyzer/util/utils';
import {UrlConfig} from '../../url-config';

@Injectable()
export class UserService extends UserData {


  constructor(private httpUtil: HttpUtilService) {
    super();
  }

  getUser(token): Observable<User> {
    return this.httpUtil.corsGet({path: UrlConfig.GET_USER_INFO});
  }
}
