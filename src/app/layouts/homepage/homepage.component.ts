import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from 'app/shared/services/content.service';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from "ng-chartist";
import { pieChartSingle } from '../../shared/data/ngxChart';
import * as chartsData from '../../shared/configs/ngx-charts.config';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { NewsDetailComponent } from 'app/shared/news-detail/news-detail.component';
import { Location } from '@angular/common';
import { environment } from 'environments/environment';

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
  @ViewChild(NewsDetailComponent) newsDetail: NewsDetailComponent;
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






  // Responsive Breakpoints
  public swiperResponsiveBreakpointsConfig: SwiperConfigInterface = {
    slidesPerView: 5,
    spaceBetween: 50,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      }
    }
  };




  detailPanelShow;
  closeDetailPanel() {
    this.detailPanelShow = false;
  }

  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private router: Router, private contentService: ContentService, private broadcastingService: BroadcastingService, private location: Location) {
    broadcastingService.selectedNewsId.subscribe(() => {
      this.detailPanelShow = true;
      this.newsDetail.publicOpenPanel();
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.location.go('');
    }, 100);
    if (isPlatformBrowser(this._platformId)) {
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