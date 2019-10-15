import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {LocalDataSource} from 'ng2-smart-table';
import {FileListData} from '../../../@core/data/file.list';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  settings = {
    // add: {
    //   addButtonContent: '<i class="nb-plus"></i>',
    //   createButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    // edit: {
    //   editButtonContent: '<i class="nb-edit"></i>',
    //   saveButtonContent: '<i class="nb-checkmark"></i>',
    //   cancelButtonContent: '<i class="nb-close"></i>',
    // },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      fileName: {
        title: 'File Name',
        type: 'string',
      },
      size: {
        title: 'Size',
        type: 'string',
      },
      lastModifyTime: {
        title: 'Last Modify Time',
        type: 'string',
      },
    },
  };
  allColumns = ['文件名', '操作'];

  private fileList: any;
  private fileDownloadUrl: string;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private fileService: FileListData,
  ) {
    this.fileDownloadUrl = environment.fileDowloadUrl;
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }


  ngOnInit() {
    this.fileService.listFiles().subscribe((fileList) => {
      this.source.load(fileList);
    });
  }

  deleteFile(fileItem: any) {
    window.alert(fileItem);
  }
}
