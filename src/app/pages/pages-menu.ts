import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS_USER: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/backend/dashboard',
  //   home: true,
  // },
  {
    title: '用户信息',
    icon: 'person-outline',
    home: true,
    expanded : true,
    children: [
      {
        title: '个人信息',
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
];

export const MENU_ITEMS_ADMIN: NbMenuItem[] = [
  // {
  //   title: 'Dashboard',
  //   icon: 'home-outline',
  //   link: '/backend/dashboard',
  //   home: true,
  // },
  {
    title: '用户信息',
    icon: 'person-outline',
    home: true,
    expanded : true,
    children: [
      {
        title: '个人信息',
        link: '/backend/userinfo/profile',
      },
      {
        title: '用户列表',
        link: '/backend/userinfo/list',
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
];
