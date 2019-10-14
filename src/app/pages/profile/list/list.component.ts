import {Component} from '@angular/core';
import {FileListService} from '../../../@core/impl/file.list.service';

@Component({
  selector: 'ngx-list',
  templateUrl: 'list.component.html',
  styleUrls: ['list.component.scss'],
})
export class ListComponent {
  private fileList: any;

  constructor(
    private fileService: FileListService,
  ) {
  }


  ngOnInit = () => {
    this.fileService.listFiles().subscribe((fileList) => {
      console.info(`${JSON.stringify(fileList)}`);
    });
  }
}
