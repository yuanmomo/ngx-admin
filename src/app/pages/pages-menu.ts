import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/backend/dashboard',
  //   home: true,
  // },
  {
    title: '个人信息',
    icon: 'person-outline',
    home: true,
    expanded : true,
    children: [
      {
        title: '基本信息',
        link: '/backend/userinfo/profile',
      },
    ],
  },
  {
    title: '代理下载',
    icon: 'download-outline',
    expanded : false,
    home: false,
    children: [
      {
        title: '下载',
        link: '/backend/proxyDownload/download',
      },
      {
        title: '已下载文件',
        link: '/backend/proxyDownload/list',
      },
    ],
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  // {
  //   title: 'Auth',
  //   icon: 'lock-outline',
  //   children: [
  //     {
  //       title: 'Login',
  //       link: '/auth/login',
  //     },
  //     {
  //       title: 'Register',
  //       link: '/auth/register',
  //     },
  //     {
  //       title: 'Request Password',
  //       link: '/auth/request-password',
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: '/auth/reset-password',
  //     },
  //   ],
  // },
];
