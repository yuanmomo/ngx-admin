/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {NbAuthService, NbTokenService} from '@nebular/auth';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    private tokenService: NbTokenService,
  ) {
  }

  ngOnInit() {
    this.tokenService.clear();
  }
}
