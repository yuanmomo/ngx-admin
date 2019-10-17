import {of as observableOf, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import { UserData, UserDetail} from '../data/users';

@Injectable()
export class MockUserService extends UserData {

  private userDetail = [{
    userName: 'Alan Thompson',
    id: 1,
    email: 'mail1@gogole.com',
    uploadToken: 'e8a88bb6f4d420a8517965d25cd54a14',
    createTime: '2019-10-10 21:12:22',
    lastLoginTime: '2019-10-15 21:12:22',
    isAdmin: '是',
  }];

  constructor(
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
