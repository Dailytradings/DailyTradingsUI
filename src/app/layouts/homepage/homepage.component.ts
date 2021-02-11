import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'app/shared/services/content.service';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";


//Declarations
declare var require: any;
const data: any = require('../../shared/data/chartist.json');

//Interface
export interface Chart {
    type: ChartType;
    data: Chartist.IChartistData;
    options?: any;
    responsiveOptions?: any;
    events?: ChartEvent;
}




@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

isBrowser;

// Donut Chart 2 Starts
donutChart2: Chart = {
  type: 'Pie',
  data: {
    "series": [
      90,
      10
    ]
  },
  options: {
      donut: true,
      donutWidth: 5,
      showLabel: true,
      labelDirection: 'implode',
  },
};
// Donut Chart 2 Ends

  bannerUrl = "../../../assets/img/banner/banner-18.jpg";

  mainNews;

  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private router: Router, private contentService: ContentService) { }

  ngOnInit(): void {
   if(isPlatformBrowser(this._platformId)) {
     this.isBrowser = true;
    this.contentService.getBanner().subscribe(res => {
      if (res)
        this.bannerUrl = res;
    });
   }
    this.contentService.getOurEstimatesActivityNews(1).subscribe(res => {
      if (res)
        this.mainNews = res;
    });
  }


  getMore(param) {
    switch (param) {
      case 'earnings':
        this.router.navigate(['/stock/earnings-page']);
        break;
      case 'dividend':
        this.router.navigate(['/stock/dividend-page']);
        break;
      case 'insiderTrades':
        this.router.navigate(['/stock/insider-trades-page']);
        break;
      case 'analystRatings':
        this.router.navigate(['/stock/analyst-ratings-page']);
        break;
    }
  }








}