import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [

  {
    path: '', title: 'Earnings', icon: 'ft-bar-chart-2', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      { path: '/stock/earnings-opportunities', title: 'Earnings Opportunities', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/predictions-from-other-websites', title: 'Predictions From Other Websites', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/earnings-analysis-via-stock-peers', title: 'Earnings Analysis via Stocks\' Peers', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/previous-earnings-effects-of-stocks', title: 'Previous Earnings Effects of Stocks', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/most-reliable-competitors', title: 'Most Reliable Competitors of Stocks', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Dividends', icon: 'ft-bar-chart-2', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      { path: '/stock/dividend-opportunities', title: 'Dividend Opportunities', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/dividend-tax-calculator', title: 'Dividend Tax Calculator', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/previous-dividend-effects-of-stocks', title: 'Previous Dividend Effects of Stocks', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '/stock/insider-trades', title: 'Insider Trades', icon: 'ft-home', class: 'nav-item', isExternalLink: false, submenu: []
  },
  {
    path: '/stock/analyst-ratings', title: 'Analyst Ratings', icon: 'ft-home', class: 'nav-item', isExternalLink: false, submenu: []
  },
  {
    path: '/stock/all-news', title: 'News', icon: 'ft-home', class: 'nav-item', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Opportunities', icon: 'ft-bar-chart-2', class: 'dropdown nav-item has-sub hidden-menu', isExternalLink: false, submenu: [
      { path: '/stock/earnings-opportunities-old', title: 'Earnings', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/realtime-opportunities', title: 'Realtime', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/insider-trades-old', title: 'Insider Trades', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/dividends', title: 'Dividends', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/ratings', title: 'Analyst Ratings', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/Logs/RealTimeLog.txt', title: 'CrudeOil', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/stock/premarket-analysis', title: 'PreMarket All', icon: 'ft-arrow-right', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },


    ]
  },
  {
    path: '', title: 'Management', icon: 'ft-activity', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      { path: '/management/oldcompany', title: 'Old Company', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/management/general', title: 'General', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/management/company', title: 'Company', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/management/user', title: 'User', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  }
];
