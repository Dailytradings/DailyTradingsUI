import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';
import { AlertModalComponent } from 'app/layouts/alert/alert-modal/alert-modal.component';
import { AuthService } from 'app/shared/auth/auth.service';
import { ContentService } from 'app/shared/services/content.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { environment } from 'environments/environment';
import * as chartsData from '../../../shared/configs/ngx-charts.config';


@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss']
})
export class OverviewPanelComponent implements OnInit, AfterViewInit {

  @Input() symbol;
  @Input() allowedToSee;
  pieChartSingle = [
    {
      "name": "Insider",
      "value": 100
    }
  ];
  pieChartColorScheme = chartsData.pieChartColorScheme;
  pieChartShowLegend = chartsData.pieChartShowLegend;
  pieChart1ExplodeSlices = chartsData.pieChart1ExplodeSlices;
  pieChartShowLabels = chartsData.pieChartShowLabels;
  pieChart1Doughnut = chartsData.pieChart1Doughnut;
  pieChartGradient = chartsData.pieChartGradient;

  @ViewChild(PieChartComponent) pieChart: PieChartComponent;
  @ViewChild('modal') modal: AlertModalComponent;

  constructor(@Inject(PLATFORM_ID) private _platformId: Object,
    private contentService: ContentService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      setTimeout(() => {
        this.pieChart.margins = [0, 0, 0, 75];
        this.pieChart.update();
      }, 0);
    }
  }

  isBrowser;
  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.isBrowser = true;
    }
    let insider = this.symbol.insiderShare;
    console.log('symbol', this.symbol);
    console.log('insider', insider);
    this.pieChartSingle = [
      {
        "name": "Insider",
        "value": this.symbol.insiderShare
      },
      {
        "name": "Instutitutional",
        "value": this.symbol.institutionalShare
      },
      {
        "name": "Public",
        "value": this.symbol.publicShare
      }
    ];
    this.cdRef.detectChanges();
  }

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }


  addToWatchList() {
    if (this.allowedToSee) {
      this.contentService.addToWatchList(this.symbol.id).subscribe(res => {
        if (res) {
          this.symbol.isMonitoring = true;
        }
        this.cdRef.detectChanges();
      });
    } else {
      this.notificationService.warnNotAllowed();
    }
  }

  removeFromWatchList() {
    if (this.allowedToSee) {
      this.contentService.removeFromWatchList(this.symbol.id).subscribe(res => {
        if (res) {
          this.symbol.isMonitoring = false;
        }
        this.cdRef.detectChanges();
      });
    } else {
      this.notificationService.warnNotAllowed();
    }

  }

  showAlertModal() {
    if (this.allowedToSee) {
      this.modal.open();
    } else {
      this.notificationService.warnNotAllowed();
    }
  }


  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
}
