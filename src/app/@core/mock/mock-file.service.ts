import {of as observableOf, Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {FileItem, FileListData} from '../data/file.list';
import {ObserveOnMessage} from 'rxjs/internal/operators/observeOn';

@Injectable()
export class MockFileService extends FileListData {

  private time: Date = new Date;

  private files: FileItem[] = [{
    id: 1,
    fileName: '1.txt',
    size: '1.2M',
    lastModifyTime: '2019-10-01 10:12:34',
    button: '',
  }, {
    id: 2,
    fileName: 'tst.png',
    size: '1.5G',
    lastModifyTime: '2019-09-01 10:12:34',
    button: '',
  }, {
    id: 3,
    fileName: 'asdfasf.dmg',
    size: '10K',
    lastModifyTime: '2019-01-01 10:12:34',
    button: '',
  },
  ];

  constructor() {
    super();
  }


  listFiles(): Observable<FileItem[]> {
    return observableOf(this.files);
  }
}
