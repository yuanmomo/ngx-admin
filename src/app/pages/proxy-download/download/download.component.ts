import {Component, OnInit} from '@angular/core';
import {HttpUtilService} from '../../../common/http.util.service';
import {UrlConfig} from '../../../url-config';
import {ToastUtilService} from '../../../common/toast.util';
import {NbGlobalLogicalPosition, NbGlobalPhysicalPosition, NbGlobalPosition} from '@nebular/theme';
import {LoadUtilService} from '../../../common/load.util';

export interface ProxyDownloadResult {
  code: number;
  message: string;
  value: string;
}

declare var thunderLink: any;


@Component({
  selector: 'ngx-proxy-download-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'],
})
export class DownloadComponent implements OnInit {
  downloadUrl: string;
  fileSaveName: string;
  newDownloadUrl: string;

  disableSubmit: boolean;
  disableCopy: boolean = true;
  disableThunder: boolean = true;

  constructor(private httpUtil: HttpUtilService,
              private toastUtil: ToastUtilService,
              private loadUtil: LoadUtilService,
              ) {
  }

  ngOnInit() {
    this.loadUtil.loadScript('//open.thunderurl.com/thunder-link.js');
  }

  public submitToProxyDownload() {
    // check downloadUrl
    if (!this.httpUtil.isUrl(this.downloadUrl)) {
      this.toastUtil.showErrorToast1s(NbGlobalPhysicalPosition.TOP_RIGHT,  '提示', '请输入下载地址！！');
      return;
    }

    // disabled the submit button
    this.disableSubmit = true;
    // TODO 修改 请求方式
    this.httpUtil.corsPost<ProxyDownloadResult>(
      {
        path: UrlConfig.PROXY_DOWNLOAD_URL,
        param: {
          'token': 'Re8VhmYP8JSU74msPjkRpVGAavGC',
          'userName': 'yuanmomo',
          'url': this.downloadUrl,
          'saveName': this.fileSaveName,
        },
      }).subscribe((result: ProxyDownloadResult) => {
      if (result.code === 0 && this.httpUtil.isUrl(result.value)) { // 返回 成功
        this.newDownloadUrl = result.value;
        this.updateButtons();
      }
      this.disableSubmit = false;
    });
  }

  autoFileSaveName() {
    if (this.downloadUrl) {
      const indexOfStart = this.downloadUrl.lastIndexOf('/');
      let indexOfEnd = this.downloadUrl.indexOf('?', indexOfStart);
      console.log(indexOfStart, indexOfEnd);
      if (indexOfEnd === -1) { // 没有参数
        indexOfEnd = this.downloadUrl.length;
      }
      const fileName = this.downloadUrl.substr(indexOfStart + 1, indexOfEnd - indexOfStart - 1);
      this.fileSaveName = fileName;
    } else {
      // 清空文本
      this.fileSaveName = '';
    }
  }

  updateButtons() {
    const hasNewUrl: boolean = this.httpUtil.isUrl(this.newDownloadUrl);
    this.disableCopy = ! hasNewUrl;
    this.disableThunder = ! hasNewUrl;
  }

  openThunder() {
    // 创建单个任务
    thunderLink.newTask({
      tasks: [{
        url: this.newDownloadUrl, // 指定下载地址
      }],
    });
  }

  localDownload() {
    window.open(this.newDownloadUrl, '_blank');
  }
}
