import { Observable } from 'rxjs';



export abstract class FileListData {
  abstract listFiles(): Observable<string[]>;
}
