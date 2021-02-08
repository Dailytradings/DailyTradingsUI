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
import { AlertObject } from 'app/shared/data/alertData';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-earnings-management',
  templateUrl: './earnings-management.component.html',
  styleUrls: ['./earnings-management.component.scss']
})
export class EarningsManagementComponent implements OnInit {

  symbol: any;
  selectedEarnings;
  selectedEdit;
  epsFormSubmitted = false;
  epsForm: FormGroup;
  revenueFormSubmitted = false;
  revenueForm: FormGroup;
  forecastEpsFormSubmitted = false;
  forecastEpsForm: FormGroup;
  forecastRevenueFormSubmitted = false;
  forecastRevenueForm: FormGroup;
  
  newFormSubmitted = false;
  newForm: FormGroup;
  
  today: Date = new Date();
  keyDateForNewDataEarningsDate;



  keyDateForEarningsDate = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() }

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
      } else {
        this.broadcastingService.emitTicker(undefined);
        this.router.navigate(['/management/company']);
      }
    }, (error) => console.error(error));

    this.broadcastingService.symbolObservable.subscribe((x: any) => {
      this.getSymbolFromTicker(x.ticker);
    }, (error) => console.error(error));

    
    this.newForm = this.formBuilder.group({
      eps: [undefined],
      revenue: [undefined],
      forecastEps: [undefined, [Validators.required]],
      forecastRevenue: [undefined, [Validators.required]],
      quarter: [undefined, [Validators.required]],
      year: [undefined, [Validators.required]]
    });

    this.epsForm = this.formBuilder.group({
      eps: [0, [Validators.required]],
    });
    this.revenueForm = this.formBuilder.group({
      revenue: [0, [Validators.required]],
    });

    this.forecastEpsForm = this.formBuilder.group({
      forecastEps: [0, [Validators.required]],
    });
    this.forecastRevenueForm = this.formBuilder.group({
      forecastRevenue: [0, [Validators.required]],
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
          this.getAllEarnings();
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
        }, 100);
      }, (error) => console.error(error));
    }
  }


  getAllEarnings() {
    this.symbolService.getEarningsList(this.symbol.id).subscribe(res => {
      if (res)
        this.rows = res;
        this.tempData = this.rows;
      this.cdRef.detectChanges();
    });
  }

  get nf() {
    return this.newForm.controls;
  }

  get ef() {
    return this.epsForm.controls;
  }

  get rf() {
    return this.revenueForm.controls;
  }

  get fef() {
    return this.forecastEpsForm.controls;
  }

  get frf() {
    return this.forecastRevenueForm.controls;
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
      let date = moment(this.selectedEarnings.earningsDate).toDate();
      this.keyDateForEarningsDate = { day: date.getDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
      this.selectedEdit = undefined;
      this.resetForms();
    }
  }

  removeSelectedEarnings() {
    this.selectedEarnings = undefined;
    this.selectedEdit = undefined;
    this.resetForms();
  }
  resetForms() {
    this.epsForm.reset();
    this.revenueForm.reset();
    this.epsFormSubmitted = false;
    this.revenueFormSubmitted = false;
  }

  selectEdit(editType) {
    this.selectedEdit = editType;
    if (editType == 'setNext') {
      setTimeout(() => {
        let alertObject: AlertObject = { title: 'Do you wanna change next earnings date of '+ this.symbol.ticker +' symbol?', text: '', confirmButtonText: 'Yes', icon: 'warning' };
        this.notificationService.confirmAlert(alertObject, (result) => {
          if (result) {
            let nextEarningsItem = { id: this.selectedEarnings.id };
            this.symbolService.setNextEarnings(nextEarningsItem).subscribe(res => {
              if (res) {
                this.selectedEdit = undefined;
                this.resetForms();
                this.getAllEarnings();
              }
            });
          } else {
            this.selectedEdit = undefined;
          }
        });
      }, 1000);
    }
  }


  changeUser($event) {
    this.authService.getUserById($event.target.value).subscribe(res => {
      if (res)
        this.selectedEarnings = res;
      this.cdRef.detectChanges();
    });
  }


  onSubmit() {
    switch (this.selectedEdit) {
      case 'new':
      this.newFormSubmitted = true;
      if(this.epsForm.invalid) {
        return;
      }
      let newdatestring = this.keyDateForEarningsDate.day + '-' + this.keyDateForEarningsDate.month + '-' + this.keyDateForEarningsDate.year;
      let newItem = { symbolId: this.symbol.id, eps: this.newForm.value.eps, revenue: this.newForm.value.revenue, forecastEps: this.newForm.value.forecastEps, 
        forecastRevenue: this.newForm.value.forecastRevenue, quarter: this.newForm.value.quarter, year: this.newForm.value.year,  earningsDateText: newdatestring };
        this.symbolService.newEarnings(newItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllEarnings();
          }
        });
      break;
      case 'eps':
        this.epsFormSubmitted = true;
        if (this.epsForm.invalid) {
          return;
        }
        let epsItem = { id: this.selectedEarnings.id, eps: this.epsForm.value.eps };
        this.symbolService.reEps(epsItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllEarnings();
          }
        });
        break;
      case 'forecastEps':
        this.forecastEpsFormSubmitted = true;
        if (this.forecastEpsForm.invalid) {
          return;
        }
        let foreacstEpsItem = { id: this.selectedEarnings.id, forecastEps: this.forecastEpsForm.value.forecastEps };
        this.symbolService.reForecastEps(foreacstEpsItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllEarnings();
          }
        });
        break;
      case 'revenue':
        this.revenueFormSubmitted = true;
        if (this.revenueForm.invalid) {
          return;
        }
        let revenueItem = { id: this.selectedEarnings.id, revenue: this.revenueForm.value.revenue };
        this.symbolService.reRevenue(revenueItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllEarnings();
          }
        });
        break;
      case 'forecastRevenue':
        this.forecastRevenueFormSubmitted = true;
        if (this.forecastRevenueForm.invalid) {
          return;
        }
        let foreacstRevenueItem = { id: this.selectedEarnings.id, forecastRevenue: this.forecastRevenueForm.value.forecastRevenue };
        this.symbolService.reForecastRevenue(foreacstRevenueItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllEarnings();
          }
        });
        break;
      case 'earningsDate':
        let datestring = this.keyDateForEarningsDate.day + '-' + this.keyDateForEarningsDate.month + '-' + this.keyDateForEarningsDate.year;
        let earningsDateItem = { id: this.selectedEarnings.id, earningsDateText: datestring };
        this.symbolService.reEarningsDate(earningsDateItem).subscribe(res => {
          if (res) {
            {
              this.selectedEdit = undefined;
              this.resetForms();
              this.getAllEarnings();
            }
          }
        });
        break;
    }
  }
}
