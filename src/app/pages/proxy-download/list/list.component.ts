import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {FileListService} from '../../../@core/impl/file.list.service';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit {
  allColumns = ['文件名', '操作'];
  
  private fileList: any;
  private fileDownloadUrl: string;

  constructor(
    private fileService: FileListService,
  ) {
    this.fileDownloadUrl = environment.fileDowloadUrl;
  }

  ngOnInit() {
    this.fileService.listFiles().subscribe((fileList) => {
      this.fileList = fileList;
    });
  }

  deleteFile(fileItem: any) {
    window.alert(fileItem);
  }
}
