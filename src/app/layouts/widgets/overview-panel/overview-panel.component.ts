import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { PieChartComponent } from '@swimlane/ngx-charts';
import { AlertModalComponent } from 'app/layouts/alert/alert-modal/alert-modal.component';
import { AuthService } from 'app/shared/auth/auth.service';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';
import * as chartsData from '../../../shared/configs/ngx-charts.config';


@Component({
  selector: 'app-overview-panel',
  templateUrl: './overview-panel.component.html',
  styleUrls: ['./overview-panel.component.scss']
})
export class OverviewPanelComponent implements OnInit, AfterViewInit {

  @Input() symbol;
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

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
        this.pieChart.margins = [0, 0, 0, 75];
        this.pieChart.update();
    }, 0);
}

  ngOnInit(): void {
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
    this.contentService.addToWatchList(this.symbol.id).subscribe(res => {
      if (res) {
        this.symbol.isMonitoring = true;
      }
      this.cdRef.detectChanges();
    });
  }

  removeFromWatchList() {
    this.contentService.removeFromWatchList(this.symbol.id).subscribe(res => {
      if (res) {
        this.symbol.isMonitoring = false;
      }
      this.cdRef.detectChanges();
    });
  }

  showAlertModal() {
    this.modal.open();
  }

  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
}
