import {of as observableOf, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {User, UserData} from '../data/users';
import {HttpUtilService} from '../../common/http.util.service';
import {angularClassDecoratorKeys} from 'codelyzer/util/utils';
import {UrlConfig} from '../../url-config';
import {FileListData} from '../data/file.list';

@Injectable()
export class MockFileService extends FileListData {

  private time: Date = new Date;

  private files = [
    '1.txt',
    '2.png',
    '3.dmg',
  ];

  constructor(private httpUtil: HttpUtilService) {
    super();
  }


  listFiles(): Observable<string[]> {
    return observableOf(this.files);
  }
}
