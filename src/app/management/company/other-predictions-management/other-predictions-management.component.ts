import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadcastingService } from '../../../shared/services/broadcasting.service';
import { SymbolService } from '../../../shared/services/symbol.service';
import { Location } from '@angular/common';
import { AuthService } from '../../../shared/auth/auth.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/services/notification.service';
import { AlertObject } from 'app/shared/data/alertData';

@Component({
  selector: 'app-other-predictions-management',
  templateUrl: './other-predictions-management.component.html',
  styleUrls: ['./other-predictions-management.component.scss']
})
export class OtherPredictionsManagementComponent implements OnInit {

  symbol: any;
  selectedEarnings;
  selectedEdit;
  siteId;
  siteList;
  predictionFormSubmitted = false;
  eps;
  revenue;
  epsEnabled = false;
  revenueEnabled = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private symbolService: SymbolService,
    private broadcastingService: BroadcastingService,
    private cdRef: ChangeDetectorRef,
    private location: Location,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService) {
    authService.isPageAuthorized("Management");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0) {
        this.getSymbolFromTicker(params['id']);
      }  else {
        this.broadcastingService.emitTicker(undefined);
        this.router.navigate(['/management/company']);
      }
    }, (error) => console.error(error));

    this.broadcastingService.symbolObservable.subscribe((x: any) => {
      this.getSymbolFromTicker(x.ticker);
    }, (error) => console.error(error));


    this.symbolService.getOtherPredictionSiteList().subscribe(res => {
      if (res)
        this.siteList = res;
    });

    // content header
    this.contentHeader = {
      headerTitle: 'Datatables',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '#'
          },
          {
            name: 'Forms & Tables',
            isLink: true,
            link: ''
          },
          {
            name: 'Datatables',
            isLink: false
          }
        ]
      }
    };
  }

  getSymbolFromTicker(ticker) {
    if (ticker) {
      this.symbol = undefined;
      this.symbolService.getSymbol(ticker).subscribe(response => {
        let path = this.router.url;
        let lastPartOfPath = path.substr(path.lastIndexOf("\/"), path.length - path.lastIndexOf("\/"))
        if (lastPartOfPath != "/company")
          path = path.substr(0, path.lastIndexOf("\/"))

        this.location.go(path + '/' + ticker);
        setTimeout(() => {
          this.symbol = response;
          this.getAllOtherPredictionsList();
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
        }, 100);
      }, (error) => console.error(error));
    }
  }


  getAllOtherPredictionsList() {
    this.symbolService.getOtherPredictionsWithEarningsList(this.symbol.id).subscribe(res => {
      if (res)
        this.rows = res;
        this.tempData = this.rows;
      this.cdRef.detectChanges();
    });
  }

  public contentHeader: object;

  // row data
  public rows;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  public expanded: any = {};

  public editing = {};

  public chkBoxSelected = [];
  public SelectionType = SelectionType;

  // server side row data
  public serverSideRowData;

  // private
  private tempData = [];
  /**
   * filterUpdate
   *
   * @param code
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();
console.log(val);
    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.earningsDateText.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * filterUpdate
   *
   * @param code
   */
  filterAnnounce(event) {
    const val = event.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      if (val === "all")
        return true;
      return d.earningsStatus.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }



  /**
   * Constructor
   *
   * @param {HttpClient} http
   */

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------


  SelectEarnings(earnings) {
    if (this.selectedEarnings == undefined || this.selectedEarnings.id != earnings.id) {
      this.selectedEarnings = earnings;
      this.selectedEdit = undefined;
      this.resetForms();
      this.cdRef.detectChanges();
    }
  }

  removeSelectedEarnings() {
    this.selectedEarnings = undefined;
    this.selectedEdit = undefined;
    this.resetForms();
  }
  resetForms() {
    this.eps = undefined;
    this.revenue = undefined;
    this.predictionFormSubmitted = false;
  }

  selectEdit(editType) {
    this.selectedEdit = editType;
    this.resetForms();
    switch (this.selectedEdit.siteName) {
      case "Whisper Number":
        this.eps = this.selectedEarnings.whisperNumberEps;
        this.revenue = this.selectedEarnings.whisperNumberRevenue;
        break;
      case "Whisper NumberSub":
        this.eps = this.selectedEarnings.whisperNumbeSubrEps;
        this.revenue = this.selectedEarnings.whisperNumberSubRevenue; 
        break;
      case "Earnings Whisper":
        this.eps = this.selectedEarnings.earningsWhisperEps;
        this.revenue = this.selectedEarnings.earningsWhisperRevenue; 
        break;
      case "Earnings WhisperSub":
        this.eps = this.selectedEarnings.earningsWhisperSubEps;
        this.revenue = this.selectedEarnings.earningsWhisperSubRevenue; 
        break;
      case "Seeking Alpha":
        this.eps = this.selectedEarnings.seekingAlphaEps;
        this.revenue = this.selectedEarnings.seekingAlphaRevenue;
        break;
    }
  }


  onSubmit() {
    this.predictionFormSubmitted = true;
    if (!this.epsEnabled && !this.revenueEnabled) {
      return;
    }
    let predictionItem = { id: this.selectedEarnings.id, eps: this.eps, revenue: this.revenue, siteId: this.selectedEdit.id, epsEnabled: this.epsEnabled, revenueEnabled: this.revenueEnabled };
    this.symbolService.rePrediction(predictionItem).subscribe(res => {
      if (res) {
        this.selectedEdit = undefined;
        this.resetForms();
        this.getAllOtherPredictionsList();
      }
    });

  }
}
