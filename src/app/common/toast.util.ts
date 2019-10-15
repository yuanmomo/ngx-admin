import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {Result} from './dto';
import {User} from '../@core/data/users';
import {
  NbComponentStatus, NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';


@Injectable()
export class ToastUtilService {

  constructor(
    private toastrService: NbToastrService,
  ) {
  }

  public showErrorTopRightToast3s(title: string, body: string) {
    this.showErrorToast3s(NbGlobalPhysicalPosition.TOP_RIGHT,  title, body );
  }
  public showErrorToast3s(position: NbGlobalPosition, title: string, body: string) {
    this.showToast(position, 'danger', title, body, 3000);
  }

  public showTopRightToast1s(type: NbComponentStatus, title: string, body: string) {
    this.showToast(NbGlobalPhysicalPosition.TOP_RIGHT, type, title, body, 1000);
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
