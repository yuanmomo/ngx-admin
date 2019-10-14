import { Observable } from 'rxjs';

export interface User {
  id: number;
  userName: string;
  email: string;
}

export interface Contacts {
  user: User;
  type: string;
}

export interface RecentUsers extends Contacts {
  time: number;
}

export abstract class UserData {
  abstract getUserInfo(): Observable<User>;
}
