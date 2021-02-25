import { isPlatformBrowser, Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from 'app/shared/services/content.service';
import * as Chartist from 'chartist';
import { ChartEvent, ChartType } from "ng-chartist";
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import * as chartsData from '../../shared/configs/ngx-charts.config';
import { pieChartSingle } from '../../shared/data/ngxChart';

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
  allowedToSee;

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

  // autoplay
  public swiperAutoplayConfig: SwiperConfigInterface = {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  };


  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private router: Router, private contentService: ContentService, private broadcastingService: BroadcastingService, private location: Location, private authService: AuthService, private cdRef: ChangeDetectorRef) { }


  checkDataVisibilityPermission() {
    this.allowedToSee = this.authService.isAuthenticated("EarningsOpportunities");
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    setTimeout(() => {
      this.location.go('');
    }, 100);
    if (isPlatformBrowser(this._platformId)) {
      this.isBrowser = true;
      this.checkDataVisibilityPermission();
      this.contentService.getBanner().subscribe(res => {
        if (res)
          this.bannerUrl = res;
      });
    }
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





  pieChartSingle = pieChartSingle;
  //Pie Charts

  pieChartView: any[] = chartsData.pieChartView;

  // options
  pieChartShowLegend = chartsData.pieChartShowLegend;

  pieChartColorScheme = chartsData.pieChartColorScheme;

  // pie
  pieChartShowLabels = chartsData.pieChartShowLabels;
  pieChartExplodeSlices = chartsData.pieChartExplodeSlices;
  pieChartDoughnut = chartsData.pieChartDoughnut;
  pieChartGradient = chartsData.pieChartGradient;

  pieChart1ExplodeSlices = chartsData.pieChart1ExplodeSlices;
  pieChart1Doughnut = chartsData.pieChart1Doughnut;







}