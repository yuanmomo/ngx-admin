import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@core/impl/users.service';
import {UserDetail} from '../../../@core/data/users';
import {UrlConfig} from '../../../url-config';
import {HttpUtilService} from '../../../common/http.util.service';
import {ToastUtilService} from '../../../common/toast.util';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent implements OnInit{
  private user = new UserDetail() ;

  constructor(
    private userService: UserService,
    private httpUtil: HttpUtilService,
    private toastUtil: ToastUtilService,
  ) {
  }
  updateUserInfo() {
    const deleteUrl = `${UrlConfig.UPDATE_USER_INFO_URL}`;
    this.httpUtil.doPost({
      path: deleteUrl,
      param: {
        'userName': this.user.userName,
      },
    }).subscribe((msg) => {
      this.toastUtil.showTopRightToast1s('success', '提示', msg);
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.userService.getUserDetail().subscribe(
      (user) => {
        this.user = user;
      });
  }
}
