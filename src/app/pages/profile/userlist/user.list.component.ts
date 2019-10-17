import {Component, OnInit } from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {UrlConfig} from '../../../url-config';
import {HttpUtilService} from '../../../common/http.util.service';
import {ToastUtilService} from '../../../common/toast.util';
import {UserData} from '../../../@core/data/users';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.scss'],
})
export class UserListComponent implements OnInit {
  settings = {
    columns: {
      id: {
        title: '序号',
        class: '',
        type: 'number',
      },
      email: {
        title: '邮箱',
        type: 'string',
      },
      userName: {
        title: '用户名',
        type: 'string',
      },
      isAdmin: {
        title: '管理员',
        type: 'string',
      },
      uploadToken: {
        title: 'Upload Token',
        type: 'string',
      },
      status: {
        title: '状态',
        type: 'string',
      },
      createTime: {
        title: '创建时间',
        type: 'string',
      },
      lastLoginTime: {
        title: '最后一次登陆',
        type: 'string',
      },
    },
    mode: 'external',
    hideSubHeader: true,
    actions: {
      columnTitle: '操作',
      position: 'right',
      edit: true,
      add: false,
      delete: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    pager: {
      perPage: 10,
    },
  };

  userList: any;
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private userService: UserData,
    private httpUtil: HttpUtilService,
  ) {
  }

  ngOnInit() {
    this.userService.selectUserList().subscribe((userList) => {
      if (userList !== null) {
        this.userList = userList;
        this.source.load(userList);
      }
    });
  }

  deleteUser(event) {
    // console.info(`delete ${JSON.stringify(event.data)}`);
    const deleteUrl = `${UrlConfig.DELETE_USER_URL}`;
    this.httpUtil.doPost({path: deleteUrl,
      param: {
        'email': event.data['email'],
      },
    }).subscribe((msg) => {
      ToastUtilService.showTopRightToast1s( 'success', '提示', msg);
      this.ngOnInit();
    });
  }

  resetPassword(event) {
    const updateUserInfo = `${UrlConfig.UPDATE_USER_INFO_URL}`;
    this.httpUtil.doPost({
      path: updateUserInfo,
      param: {
        'id': event.data['id'],
        'password': 'password',
      },
    }).subscribe((msg) => {
      ToastUtilService.showTopRightToast1s('success', '提示', msg);
      this.ngOnInit();
    });
  }
}
