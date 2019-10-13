import {of as observableOf, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Contacts, RecentUsers, User, UserData} from '../data/users';
import {HttpUtilService} from '../../common/http.util.service';
import {angularClassDecoratorKeys} from 'codelyzer/util/utils';
import {UrlConfig} from '../../url-config';

@Injectable()
export class MockUserService extends UserData {

  private time: Date = new Date;

  private users = {
    alan: {name: 'Alan Thompson', id : 1, email : 'mail1@gogole.com'},
    nick: {name: 'Nick Jones' , id : 2, email : 'mail2@gogole.com'},
    eva: {name: 'Eva Moor', id : 3, email : 'mail3@gogole.com'},
    jack: {name: 'Jack Williams', id : 4, email : 'mail4@gogole.com'},
    lee: {name: 'Lee Wong', id : 5, email : 'mail5@gogole.com'},
    kate: {name: 'Kate Martinez' , id : 6, email : 'mail6@gogole.com'},
  };
  private types = {
    mobile: 'mobile',
    home: 'home',
    work: 'work',
  };

  constructor(private httpUtil: HttpUtilService) {
    super();
  }

  getUser(token): Observable<User> {
    return observableOf(this.users.lee);
  }
}
