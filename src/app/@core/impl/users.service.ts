import {of as observableOf, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {UserData, UserDetail} from '../data/users';
import {HttpUtilService} from '../../common/http.util.service';
import {UrlConfig} from '../../url-config';

@Injectable()
export class UserService extends UserData {


  constructor(private httpUtil: HttpUtilService) {
    super();
  }

  getUserDetail(): Observable<UserDetail> {
    return this.httpUtil.doGet({path: UrlConfig.GET_USER_INFO_URL});
  }

  selectUserList(): Observable<UserDetail[]> {
    return this.httpUtil.doGet({path: UrlConfig.SELECT_USER_LIST_INFO_URL});
  }
}
