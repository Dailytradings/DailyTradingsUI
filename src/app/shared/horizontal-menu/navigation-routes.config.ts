import { RouteInfo } from '../vertical-menu/vertical-menu.metadata';

export const HROUTES: RouteInfo[] = [

  {
    path: '', title: 'Earnings', icon: 'ft-bar-chart-2', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      { path: '/stock/earnings-page', title: 'Earnings Opportunities', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/other-predictions-from-websites', title: 'Other Predictions From Websites', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/earnings-analysis', title: 'Earnings Analysis via Stocks\' Peers', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/previous-earnings-effects', title: 'Previous Earnings Effects of Stocks', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/most-reliable-competitors', title: 'Most Reliable Competitors of Stocks', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Dividends', icon: 'ft-bar-chart-2', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      { path: '/stock/dividend-page', title: 'Dividend Opportunities', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/dividend-tax-calculator', title: 'Dividend Tax Calculator', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/previous-dividend-effects', title: 'Previous Dividend Effects of Stocks', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
    ]
  },
  {
    path: '/stock/insider-trades-page', title: 'Insider Trades', icon: 'ft-home', class: 'nav-item', isExternalLink: false, submenu: []
  },
  {
    path: '/stock/analyst-ratings-page', title: 'Analyst Ratings', icon: 'ft-home', class: 'nav-item', isExternalLink: false, submenu: []
  },
  {
    path: '', title: 'Opportunities', icon: 'ft-bar-chart-2', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      { path: '/stock/earnings-opportunities', title: 'Earnings', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/realtime-opportunities', title: 'Realtime', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/insider-trades', title: 'Insider Trades', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/dividends', title: 'Dividends', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/stock/ratings', title: 'Analyst Ratings', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/Logs/RealTimeLog.txt', title: 'CrudeOil', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: true, submenu: [] },
      { path: '/stock/premarket-analysis', title: 'PreMarket All', icon: 'ft-arrow-right', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      {
        path: '', title: 'PreMarket A...', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/AAL.txt', title: 'AAL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AAPL.txt', title: 'AAPL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/ADBE.txt', title: 'ADBE', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AIG.txt', title: 'AIG', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/ALXN.txt', title: 'ALXN', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AMAT.txt', title: 'AMAT', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AMD.txt', title: 'AMD', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AMGN.txt', title: 'AMGN', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AMZN.txt', title: 'AMZN', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/ASML.txt', title: 'ASML', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/ATVI.txt', title: 'ATVI', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AVGO.txt', title: 'AVGO', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/AXP.txt', title: 'AXP', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },
      {
        path: '', title: 'PreMarket B...', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/BA.txt', title: 'BA', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BABA.txt', title: 'BABA', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BAC.txt', title: 'BAC', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BBY.txt', title: 'BBY', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BIDU.txt', title: 'BIDU', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BK.txt', title: 'BK', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BLK.txt', title: 'BLK', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BMY.txt', title: 'BMY', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/BRK-B.txt', title: 'BRK-B', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },
      {
        path: '', title: 'PreMarket C...', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/C.txt', title: 'C', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CAT.txt', title: 'CAT', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CI.txt', title: 'CI', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CL.txt', title: 'CL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CMCSA.txt', title: 'CMCSA', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/COST.txt', title: 'COST', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CRM.txt', title: 'CRM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CSCO.txt', title: 'CSCO', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CTSH.txt', title: 'CTSH', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/CVX.txt', title: 'CVX', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },
      {
        path: '', title: 'PreMarket D...F', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/D.txt', title: 'D', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/DAL.txt', title: 'DAL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/DHR.txt', title: 'DHR', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/DUK.txt', title: 'DUK', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/DVN.txt', title: 'DVN', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/EA.txt', title: 'EA', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/EBAY.txt', title: 'EBAY', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/EW.txt', title: 'EW', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/EXC.txt', title: 'EXC', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/EXPE.txt', title: 'EXPE', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/F.txt', title: 'F', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/FAST.txt', title: 'FAST', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/FB.txt', title: 'FB', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/FDX.txt', title: 'FDX', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/FISV.txt', title: 'FISV', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },

        ]
      },
      {
        path: '', title: 'PreMarket G...', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/GE.txt', title: 'GE', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/GILD.txt', title: 'GILD', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/GM.txt', title: 'GM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/GOOG.txt', title: 'GOOG', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/GOOGL.txt', title: 'GOOGL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/GPRO.txt', title: 'GPRO', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/GRPN.txt', title: 'GRPN', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/GS.txt', title: 'GS', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },
      {
        path: '', title: 'PreMarket H...I', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/HAL.txt', title: 'HAL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/HD.txt', title: 'HD', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/HPQ.txt', title: 'HPQ', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/IBM.txt', title: 'IBM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/ILMN.txt', title: 'ILMN', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/INTC.txt', title: 'INTC', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/ISRG.txt', title: 'ISRG', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },
      {
        path: '', title: 'PreMarket J...L', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/JD.txt', title: 'JD', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/JNJ.txt', title: 'JNJ', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/JPM.txt', title: 'JPM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/KLAC.txt', title: 'KLAC', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/KO.txt', title: 'KO', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/LLY.txt', title: 'LLY', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/LMT.txt', title: 'LMT', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/LOW.txt', title: 'LOW', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/LRCX.txt', title: 'LRCX', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/LVS.txt', title: 'LVS', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },

      {
        path: '', title: 'PreMarket M...', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/MA.txt', title: 'MA', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MAR.txt', title: 'MAR', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MCD.txt', title: 'MCD', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MCHP.txt', title: 'MCHP', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MDT.txt', title: 'MDT', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MMM.txt', title: 'MMM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MRK.txt', title: 'MRK', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MS.txt', title: 'MS', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MSFT.txt', title: 'MSFT', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/MU.txt', title: 'MU', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },
      {
        path: '', title: 'PreMarket N...', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/NFLX.txt', title: 'NFLX', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/NIO.txt', title: 'NIO', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/NKE.txt', title: 'NKE', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/NKLA.txt', title: 'NKLA', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/NOC.txt', title: 'NOC', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/NTAP.txt', title: 'NTAP', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/NTES.txt', title: 'NTES', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/NVDA.txt', title: 'NVDA', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
        ]
      },
      {
        path: '', title: 'PreMarket O...P', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/ORCL.txt', title: 'ORCL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/OXY.txt', title: 'OXY', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/PEP.txt', title: 'PEP', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/PFE.txt', title: 'PFE', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/PG.txt', title: 'PG', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/PM.txt', title: 'PM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/PYPL.txt', title: 'PYPL', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },

        ]
      },
      {
        path: '', title: 'PreMarket Q...X', icon: 'ft-arrow-right', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
          { path: '/Logs/Analysis/QCOM.txt', title: 'QCOM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/RACE.txt', title: 'RACE', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/REGN.txt', title: 'REGN', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/ROST.txt', title: 'ROST', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/SAP-GY.txt', title: 'SAP-GY', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/STZ.txt', title: 'STZ', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/T.txt', title: 'T', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] },
          { path: '/Logs/Analysis/XOM.txt', title: 'XOM', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: true, submenu: [] }
        ]
      }

    ]
  },
  {
    path: '', title: 'Management', icon: 'ft-activity', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      { path: '/management/oldcompany', title: 'Old Company', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/management/company', title: 'Company', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
      { path: '/management/user', title: 'User', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
    ]
  },
  {
    path: '', title: 'Template', icon: 'ft-archive', class: 'dropdown nav-item has-sub', isExternalLink: false, submenu: [
      {
        path: '', title: 'Dashboard', icon: 'ft-home', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          { path: '/dashboard/dashboard1', title: 'Dashboard 1', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/dashboard/dashboard2', title: 'Dashboard 2', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
        ]
      },
      {
        path: '', title: 'Apps', icon: 'ft-box', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          { path: '/inbox', title: 'Email', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/chat', title: 'Chat', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/chat-ngrx', title: 'Chat NgRx', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/taskboard', title: 'Task Board', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/taskboard-ngrx', title: 'Task Board NgRx', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/calendar', title: 'Calendar', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
        ]
      },
      {
        path: '', title: 'UI Kit', icon: 'ft-aperture', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          { path: '/uikit/grids', title: 'Grid', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/uikit/typography', title: 'Typography', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/uikit/syntaxhighlighter', title: 'Syntax Highlighter', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/uikit/helperclasses', title: 'Helper Classes', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/uikit/textutilities', title: 'Text Utilities', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/uikit/colorpalettes', title: 'Color Palette', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          {
            path: '', title: 'Icons', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/uikit/feather', title: 'Feather Icon', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/uikit/font-awesome', title: 'Font Awesome Icon', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/uikit/simple-line', title: 'Simple Line Icon', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          },
        ]
      },
      {
        path: '', title: 'Components', icon: 'ft-briefcase', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          {
            path: '', title: 'Cards', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/cards/basic', title: 'Basic Cards', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/cards/advanced', title: 'Advanced Cards', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          },
          {
            path: '', title: 'Bootstrap', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/components/buttons', title: 'Buttons', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/ng-buttons', title: 'NG Buttons', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/alerts', title: 'Alerts', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/badges', title: 'Badges', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/dropdowns', title: 'Dropdowns', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/media', title: 'Media Objects', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/pagination', title: 'Pagination', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/progress', title: 'Progress Bars', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/models', title: 'Modals', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/collapse', title: 'Collapse', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/lists', title: 'List', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/accordion', title: 'Accordion', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/carousel', title: 'Carousel', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/popover', title: 'Popover', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/rating', title: 'Rating', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/tabs', title: 'Tabs', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/tooltip', title: 'Tooltip', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/typeahead', title: 'Typeahead', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          },
          {
            path: '', title: 'Extra', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/components/sweetalerts', title: 'Sweet Alert', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/toastr', title: 'Toastr', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/nouislider', title: 'NoUI Slider', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/upload', title: 'Upload', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/dragndrop', title: 'Drag and Drop', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/tour', title: 'Tour', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/cropper', title: 'Image Cropper', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/avatar', title: 'Avatar', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/components/swiper', title: 'Swiper', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          }
        ]
      },
      {
        path: '', title: 'Forms', icon: 'ft-edit', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          {
            path: '', title: 'Elements', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/forms/inputs', title: 'Inputs', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/input-groups', title: 'Input Groups', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/radio', title: 'Radio', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/checkbox', title: 'Checkbox', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/switch', title: 'Switch', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/select', title: 'Select', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/editor', title: 'Editor', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/tags', title: 'Input Tags', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/datepicker', title: 'Datepicker', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/forms/timepicker', title: 'Timepicker', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
            ]
          },
          { path: '/forms/layout', title: 'Layouts', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/forms/validation', title: 'Validation', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/forms/archwizard', title: 'Wizard', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
        ]
      },
      {
        path: '', title: 'Tables', icon: 'ft-grid', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          {
            path: '', title: 'Bootstrap Tables', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/tables/basic', title: 'Basic', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/tables/extended', title: 'Extended', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/tables/angular', title: 'Angular', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          },
          {
            path: '/datatables', title: 'DataTables', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: []
          }
        ]
      },
      {
        path: '', title: 'Charts & Maps', icon: 'ft-bar-chart-2', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          {
            path: '', title: 'Charts', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/charts/chartjs', title: 'ChartJs', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/charts/chartist', title: 'Chartist', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/charts/apex', title: 'Apex', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/charts/ngx', title: 'NGX', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
            ]
          },
          {
            path: '', title: 'Maps', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/maps/google', title: 'Google Map', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/maps/fullscreen', title: 'Full Screen Map', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          }
        ]
      },
      {
        path: '', title: 'Pages', icon: 'ft-file-text', class: 'dropdown nav-item has-sub', isExternalLink: false,
        submenu: [
          {
            path: '', title: 'Authentication', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/pages/forgotpassword', title: 'Forgot Password', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/pages/login', title: 'Login', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/pages/register', title: 'Register', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/pages/lockscreen', title: 'Lock Screen', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          },
          { path: '/pages/horizontaltimeline', title: 'Horizontal Timeline', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          {
            path: '', title: 'Vertical Timeline', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', isExternalLink: false,
            submenu: [
              { path: '/pages/timeline-vertical-center', title: 'Center', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/pages/timeline-vertical-left', title: 'Left', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
              { path: '/pages/timeline-vertical-right', title: 'Right', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
            ]
          },
          {
            path: '', title: 'Users', icon: 'ft-arrow-right submenu-icon', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false,
            submenu: [
              { path: '/pages/users-list', title: 'List', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
              { path: '/pages/users-view', title: 'View', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] },
              { path: '/pages/users-edit', title: 'Edit', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] }
            ]
          },
          { path: '/pages/account-settings', title: 'Account Settings', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/profile', title: 'User Profile', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/invoice', title: 'Invoice', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/error', title: 'Error', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/comingsoon', title: 'Coming Soon', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/maintenance', title: 'Maintenance', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/gallery', title: 'Gallery', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/search', title: 'Search', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/faq', title: 'FAQ', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] },
          { path: '/pages/kb', title: 'Knowledge Base', icon: 'ft-arrow-right submenu-icon', class: 'dropdown-item', isExternalLink: false, submenu: [] }
        ]
      }
    ]
  },
];
