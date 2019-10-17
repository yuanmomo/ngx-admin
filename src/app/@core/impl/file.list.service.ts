import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpUtilService} from '../../common/http.util.service';
import {UrlConfig} from '../../url-config';
import {FileItem, FileListData} from '../data/file.list';

@Injectable()
export class FileListService extends FileListData {


  constructor(private httpUtil: HttpUtilService) {
    super();
  }


  listFiles(): Observable<FileItem[]> {
    return this.httpUtil.doGet({path: UrlConfig.FILE_LIST_URL});
  }
}
