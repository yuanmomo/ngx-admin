import {Component} from '@angular/core';
import {HttpUtilService} from '../../common/http.util.service';
import {UrlConfig} from '../../url-config';

export interface ProxyDownloadResult {
  code: number;
  message: string;
  value: string;
}

@Component({
  selector: 'ngx-proxy-download',
  templateUrl: './proxy.download.component.html',
  styleUrls: ['./proxy.download.component.scss'],
})
export class ProxyDownloadComponent {
  downloadUrl: string;

  constructor(private httpUtil: HttpUtilService) {
  }

  public submitToProxyDownload() {
    this.httpUtil.corsPost<ProxyDownloadResult>(
      {
      path: UrlConfig.PROXY_DOWNLOAD_URL,
      param: {
        'token': 'Re8VhmYP8JSU74msPjkRpVGAavGC',
        'userName': 'yuanmomo',
        'url': this.downloadUrl,
        'saveName': 'Lemon_2.3.0.dmg',
      },
    }).subscribe((result: ProxyDownloadResult) => {
      window.alert(result.value);
    });
  }
}
