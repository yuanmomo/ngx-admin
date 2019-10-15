import {Observable} from 'rxjs';


export class UserDetail {
  id: number;
  userName: string;
  email: string;
  uploadToken: string;
  createTime: string;
  lastLoginTime: string;
}


export abstract class UserData {
  abstract getUserDetail(): Observable<UserDetail>;
}
