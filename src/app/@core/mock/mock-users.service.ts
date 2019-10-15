import {of as observableOf, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { UserData, UserDetail} from '../data/users';
import {HttpUtilService} from '../../common/http.util.service';
import {angularClassDecoratorKeys} from 'codelyzer/util/utils';
import {UrlConfig} from '../../url-config';

@Injectable()
export class MockUserService extends UserData {

  private time: Date = new Date;

  private userDetail = [{
    userName: 'Alan Thompson',
    id: 1,
    email: 'mail1@gogole.com',
    uploadToken: 'e8a88bb6f4d420a8517965d25cd54a14',
    createTime: '2019-10-10 21:12:22',
    lastLoginTime: '2019-10-15 21:12:22',
    isAdmin: '是',
  }];

  constructor(private httpUtil: HttpUtilService,
  ) {
    super();
  }


  getUserDetail(): Observable<UserDetail> {
    return observableOf(this.userDetail[0]);
  }

  selectUserList(): Observable<UserDetail[]> {
    return observableOf(this.userDetail);
  }
}
