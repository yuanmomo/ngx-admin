import { Observable } from 'rxjs';

export interface User {
  id: number;
  userName: string;
  email: string;
}


export abstract class UserData {
  abstract getUserInfo(): Observable<User>;
}
