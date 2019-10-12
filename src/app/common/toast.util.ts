import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Result} from './dto';
import {User} from '../@core/data/users';
import {
  NbComponentStatus,
  NbContextMenuComponent,
  NbGlobalLogicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';


@Injectable()
export class ToastUtilService {

  constructor(
    private toastrService: NbToastrService,
  ) {
  }

  public showErrorToast1s(position: NbGlobalPosition, title: string, body: string) {
    this.showToast(position, 'danger', title, body, 1000);
  }

  public showToast1s(position: NbGlobalPosition, type: NbComponentStatus, title: string, body: string) {
    this.showToast(position, type, title, body, 1000);
  }

  public showToast(position: NbGlobalPosition, type: NbComponentStatus, title: string, body: string, duration: number) {
    const config = {
      status: type,
      duration: duration,
      position: position,
    };
    const titleContent = title ? `${title}` : 'Tips:';

    this.toastrService.show(body, titleContent, config);
  }
}
