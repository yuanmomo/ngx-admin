import {Injectable} from '@angular/core';
import {
  NbComponentStatus, NbGlobalPhysicalPosition,
  NbGlobalPosition,
  NbToastrService,
} from '@nebular/theme';


@Injectable()
export class ToastUtilService {
  public static nbToastrService = null;

  constructor(
    toastrService: NbToastrService,
  ) {
    ToastUtilService.nbToastrService = toastrService;
  }

  public static showErrorTopRightToast3s(title: string, body: string) {
    this.showErrorToast3s(NbGlobalPhysicalPosition.TOP_RIGHT,  title, body );
  }
  public static showErrorToast3s(position: NbGlobalPosition, title: string, body: string) {
    this.showToast(position, 'danger', title, body, 3000);
  }

  public static showTopRightToast1s(type: NbComponentStatus, title: string, body: string) {
    this.showToast(NbGlobalPhysicalPosition.TOP_RIGHT, type, title, body, 1000);
  }
  public static showToast1s(position: NbGlobalPosition, type: NbComponentStatus, title: string, body: string) {
    this.showToast(position, type, title, body, 1000);
  }

  public static showToast(position: NbGlobalPosition, type: NbComponentStatus, title: string, body: string, duration: number) {
    const config = {
      status: type,
      duration: duration,
      position: position,
    };
    const titleContent = title ? `${title}` : 'Tips:';

    ToastUtilService.nbToastrService.show(body, titleContent, config);
  }
}
