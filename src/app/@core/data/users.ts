import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
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
  abstract getUser(token): Observable<User>;
}
