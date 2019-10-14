import {Component} from '@angular/core';
import {NbAuthService, NbLoginComponent, NbLogoutComponent} from '@nebular/auth';

@Component({
  selector: 'ngx-logout',
  templateUrl: './logout.component.html',
})
export class NgxLogoutComponent extends NbLogoutComponent {
  ngOnInit = (): void => {
    window.alert('init');
  }
}
