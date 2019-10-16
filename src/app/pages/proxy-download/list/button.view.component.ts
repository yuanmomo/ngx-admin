import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ViewCell} from 'ng2-smart-table';
import {environment} from '../../../../environments/environment';
import {LoadUtilService} from '../../../common/load.util';

declare var thunderLink: any;

@Component({
  selector: 'ngx-button-view',
  templateUrl: './button.view.component.html',
  styleUrls: ['./button.view.component.scss'],
})
export class ButtonViewComponent implements ViewCell, OnInit {
  copy: string;
  direct: string;
  thunder: string;
  downloadUrl: string;

  @Input() value: string | number;
  @Input() rowData: any;

  // @Output() event: EventEmitter<any> = new EventEmitter();

  constructor(
    private loadUtil: LoadUtilService,
  ) {
  }

  ngOnInit() {
    const textArray = this.value.toString().split('|');
    if (textArray.length === 3) {
      this.copy = textArray[0];
      this.direct = textArray[1];
      this.thunder = textArray[2];
    }
    this.loadUtil.loadScript('//open.thunderurl.com/thunder-link.js');
    this.downloadUrl = `${environment.fileDownloadUrl}/${this.rowData['fileName']}`;
  }

  thunderDownload() {
    // 创建单个任务
    thunderLink.newTask({
      tasks: [{
        url: this.downloadUrl, // 指定下载地址
      }],
    });
  }

  directDownload() {
    // console.info(`direct download ${this.downloadUrl}`);
    window.open(this.downloadUrl, '_blank');
  }

}
