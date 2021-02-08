import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [
// Sub Menu Items has to be empty class.
  {
    path: '', title: 'Management', icon: 'ft-activity', class: 'dropdown nav-item has-sub', badge: '🔒', badgeClass: 'badge badge-pill float-right mr-1 mt-1', isExternalLink: false, submenu: [
      { path: '/management/company', title: 'Company', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/management/symbol', title: 'Symbol', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  }

];
