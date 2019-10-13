import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'backend',
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    // loadChildren: './auth/auth.module#NgxAuthModule',
    loadChildren: () => import('./auth/auth.module')
      .then(m => m.NgxAuthModule),

    // component: NbAuthComponent,
    // children: [
    //   {
    //     path: '',
    //     component: NbLoginComponent,
    //   },
    //   {
    //     path: 'login',
    //     component: NbLoginComponent,
    //   },
    //   {
    //     path: 'register',
    //     component: NbRegisterComponent,
    //   },
    //   {
    //     path: 'logout',
    //     component: NbLogoutComponent,
    //   },
    //   // {
    //   //   path: 'request-password',
    //   //   component: NbRequestPasswordComponent,
    //   // },
    //   // {
    //   //   path: 'reset-password',
    //   //   component: NbResetPasswordComponent,
    //   // },
    // ],
  },
  { path: '', redirectTo: 'backend', pathMatch: 'full' },
  { path: '**', redirectTo: 'backend' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
