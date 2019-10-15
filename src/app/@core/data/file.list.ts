import { Observable } from 'rxjs';

export interface FileItem {
  id: number;
  fileName: string;
  size: string;
  lastModifyTime: string;
  button: string;
}

export abstract class FileListData {
  abstract listFiles(): Observable<FileItem[]>;
}
