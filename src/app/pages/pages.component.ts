import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS_ADMIN, MENU_ITEMS_USER} from './pages-menu';
import {UserData} from '../@core/data/users';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
      <ngx-one-column-layout>
          <nb-menu [items]="menu"></nb-menu>
          <router-outlet></router-outlet>
      </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu = [];

  constructor(
    private userService: UserData,
  ) {

  }

  ngOnInit(): void {
    this.userService.getUserDetail().subscribe(
      (user) => {
        if (user.isAdmin === '是') {
          this.menu = MENU_ITEMS_ADMIN;
        } else {
          this.menu = MENU_ITEMS_USER;
        }
      });
  }
}
