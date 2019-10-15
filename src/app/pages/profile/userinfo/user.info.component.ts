import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../@core/impl/users.service';
import {UserDetail} from '../../../@core/data/users';
import {UrlConfig} from '../../../url-config';
import {HttpUtilService} from '../../../common/http.util.service';
import {ToastUtilService} from '../../../common/toast.util';

@Component({
  selector: 'ngx-list',
  templateUrl: 'user.info.component.html',
  styleUrls: ['user.info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  private user = new UserDetail();

  constructor(
    private userService: UserService,
    private httpUtil: HttpUtilService,
  ) {
  }

  updateUserInfo() {
    const updateUserInfo = `${UrlConfig.UPDATE_USER_INFO_URL}`;
    this.httpUtil.doPost({
      path: updateUserInfo,
      param: {
        'id': this.user.id,
        'userName': this.user.userName,
      },
    }).subscribe((msg) => {
      ToastUtilService.showTopRightToast1s('success', '提示', msg);
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
