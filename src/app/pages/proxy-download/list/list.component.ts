import {Component,  OnInit } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {LocalDataSource } from 'ng2-smart-table';
import {FileListData} from '../../../@core/data/file.list';
import {ButtonViewComponent} from './button.view.component';
import {UrlConfig} from '../../../url-config';
import {HttpUtilService} from '../../../common/http.util.service';
import {ToastUtilService} from '../../../common/toast.util';

@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: '序号',
        class: '',
        type: 'number',
      },
      fileName: {
        title: '文件名',
        type: 'string',
      },
      size: {
        title: '大小',
        type: 'string',
      },
      lastModifyTime: {
        title: '最近修改时间',
        type: 'string',
      },
      button: {
        title: '下载',
        type: 'custom',
        renderComponent: ButtonViewComponent,
        // onComponentInitFunction(instance) {
        //   instance.event.subscribe(row => {
        //     if (row['action'] === 'delete') { // 删除操作，刷新 table
        //       window.alert('delete');
        //     }
        //   });
        // },
      },
    },
    mode: 'external',
    hideSubHeader: true,
    actions: {
      columnTitle: '操作',
      position: 'right',
      edit: false,
      add: false,
      delete: true,
      // custom: [
      //   {
      //     name: 'copy',
      //     title: '复制地址',
      //   },
      //   {
      //     name: 'direct',
      //     title: '直接下载',
      //   },
      //   {
      //     name: 'thunder',
      //     title: '迅雷下载',
      //   },
      //   {
      //     name: 'delete',
      //     title: '删除',
      //   },
      // ],
    },
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
    pager: {
      perPage: 10,
    },
  };

  fileList: any;
  fileDownloadUrl: string;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private fileService: FileListData,
    private httpUtil: HttpUtilService,
  ) {
    this.fileDownloadUrl = environment.fileDownloadUrl;
  }

  ngOnInit() {
    this.fileService.listFiles().subscribe((fileList) => {
      if (fileList !== null) {
        fileList.forEach((file, index, array) => {
          file.button = '复制地址|直接下载|迅雷下载';
        });

        this.fileList = fileList;
        this.source.load(fileList);
      }
    });
  }

  deleteFile(event) {
    // console.info(`delete ${JSON.stringify(event.data)}`);
    const deleteUrl = `${UrlConfig.DELETE_FILE_URL}`;
    this.httpUtil.doPost({path: deleteUrl,
      param: {
        'fileName': event.data['fileName'],
      },
    }).subscribe((msg) => {
      ToastUtilService.showTopRightToast1s( 'success', '提示', msg);
      this.ngOnInit();
    });
  }
}
