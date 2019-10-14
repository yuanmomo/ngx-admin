import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService} from '@nebular/theme';
import {NbAuthJWTToken, NbAuthService, NbAuthSimpleToken} from '@nebular/auth';

// import { UserData } from '../../../@core/data/users';
import {map, takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {UserData} from '../../../@core/data/users';
import {timeSinceInMicros} from '@angular/compiler-cli/src/ngtsc/perf/src/clock';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    // { title: 'Profile' },
    {title: 'Log out'},
  ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private breakpointService: NbMediaBreakpointsService,
              private authService: NbAuthService,
  ) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    // this.authService.onTokenChange()
    //   .subscribe((token: NbAuthSimpleToken) => {
    //     if (token.isValid()) {
    //       this.user = token.getValue(); // here we receive a payload from the token and assigns it to our `user` variable
    //     }
    //   });
    //
    this.userService.getUser('').subscribe((user) => this.user = user);


    const {xl} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({name}) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
