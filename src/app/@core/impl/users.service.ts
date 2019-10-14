import {of as observableOf, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {Contacts, RecentUsers, User, UserData} from '../data/users';
import {HttpUtilService} from '../../common/http.util.service';
import {angularClassDecoratorKeys} from 'codelyzer/util/utils';
import {UrlConfig} from '../../url-config';
import {Result} from '../../common/dto';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService extends UserData {


  constructor(private httpUtil: HttpUtilService) {
    super();
  }

  getUserInfo(): Observable<User> {
    return this.httpUtil.doGet({path: UrlConfig.GET_USER_INFO});
  }
}
