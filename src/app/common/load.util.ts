import {Injectable} from '@angular/core';
import {
} from '@nebular/theme';


@Injectable()
export class LoadUtilService {

  constructor() {
  }

  public loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
