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
  selector: 'app-dividend-management',
  templateUrl: './dividend-management.component.html',
  styleUrls: ['./dividend-management.component.scss']
})
export class DividendManagementComponent implements OnInit {
  symbol: any;
  selectedDividend;
  selectedEdit;
  newFormSubmitted = false;
  newForm: FormGroup;
  dividendFormSubmitted = false;
  dividendForm: FormGroup;
  yieldFormSubmitted = false;
  yieldForm: FormGroup;
  frequencyTypeList;

  today: Date = new Date();
  keyDateForDividendDate = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() }
  keyDateForPaymentDate = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() }


  keyDateForNewDividendDate;
  keyDateForNewPaymentDate;

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
      dividend: [undefined, [Validators.required]],
      yield: [undefined, [Validators.required]]
    });

    this.dividendForm = this.formBuilder.group({
      dividend: [0, [Validators.required]],
    });
    this.yieldForm = this.formBuilder.group({
      yield: [0, [Validators.required]],
    });

    this.symbolService.getAllFrequencyTypeList().subscribe(res => {
      if (res)
        this.frequencyTypeList = res;
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
          this.getAllDividend();
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
          this.cdRef.detectChanges();
        }, 100);
      }, (error) => console.error(error));
    }
  }


  getAllDividend() {
    this.symbolService.getDividendList(this.symbol.id).subscribe(res => {
      if (res)
        this.rows = res;
      this.tempData = this.rows;
      this.cdRef.detectChanges();
    });
  }

  get nf() {
    return this.newForm.controls;
  }

  get df() {
    return this.dividendForm.controls;
  }

  get yf() {
    return this.yieldForm.controls;
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
      return d.exDate.toLowerCase().indexOf(val) !== -1 || !val;
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
      return d.dividendStatus.toLowerCase().indexOf(val) !== -1 || !val;
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


  SelectDividend(dividend) {
    if (this.selectedDividend == undefined || this.selectedDividend.id != dividend.id) {
      this.selectedDividend = dividend;
      let date = moment(this.selectedDividend.exDate).toDate();
      this.keyDateForDividendDate = { day: date.getDate(), month: date.getUTCMonth() + 1, year: date.getUTCFullYear() };
      let payDate = moment(this.selectedDividend.paymentDate).toDate();
      this.keyDateForPaymentDate = { day: payDate.getDate(), month: payDate.getUTCMonth() + 1, year: payDate.getUTCFullYear() };
      this.selectedEdit = undefined;
      this.resetForms();
    }
  }

  removeSelectedDividend() {
    this.selectedDividend = undefined;
    this.selectedEdit = undefined;
    this.resetForms();
  }

  resetForms() {
    this.dividendForm.reset();
    this.yieldForm.reset();
    this.dividendFormSubmitted = false;
    this.yieldFormSubmitted = false;
  }

  selectEdit(editType) {
    this.selectedEdit = editType;
    if (editType == 'setNext') {
      setTimeout(() => {
        let alertObject: AlertObject = { title: 'Do you wanna change ex dividend date of ' + this.symbol.ticker + ' symbol?', text: '', confirmButtonText: 'Yes', icon: 'warning' };
        this.notificationService.confirmAlert(alertObject, (result) => {
          if (result) {
            let nextDividendItem = { id: this.selectedDividend.id };
            this.symbolService.setNextExDividendDate(nextDividendItem).subscribe(res => {
              if (res) {
                this.selectedEdit = undefined;
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
        this.selectedDividend = res;
      this.cdRef.detectChanges();
    });
  }


  onSubmit() {
    switch (this.selectedEdit) {
      case 'new':
      this.newFormSubmitted = true;
      if(this.newForm.invalid) {
        return;
      }  
      let newExdatestring = this.keyDateForDividendDate.day + '-' + this.keyDateForDividendDate.month + '-' + this.keyDateForDividendDate.year;
      let newPaymentdatestring = this.keyDateForPaymentDate.day + '-' + this.keyDateForDividendDate.month + '-' + this.keyDateForDividendDate.year;
      let newItem = { symbolId: this.symbol.id, dividend: this.newForm.value.dividend, yield: this.newForm.value.yield, exDate: newExdatestring, paymentDate: newPaymentdatestring };
      this.symbolService.newDividend(newItem).subscribe(res => {
        if (res) {
          this.selectedEdit = undefined;
          this.resetForms();
          this.getAllDividend();
        }
      });
 
      break;
      case 'dividend':
        this.dividendFormSubmitted = true;
        if (this.dividendForm.invalid) {
          return;
        }
        let dividendItem = { id: this.selectedDividend.id, dividend: this.dividendForm.value.dividend };
        this.symbolService.reDividend(dividendItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllDividend();
          }
        });
        break;
      case 'yield':
        this.yieldFormSubmitted = true;
        if (this.yieldForm.invalid) {
          return;
        }
        let yieldItem = { id: this.selectedDividend.id, yield: this.yieldForm.value.yield };
        this.symbolService.reYield(yieldItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllDividend();
          }
        });
        break;
      case 'dividendDate':
        let datestring = this.keyDateForDividendDate.day + '-' + this.keyDateForDividendDate.month + '-' + this.keyDateForDividendDate.year;
        let dividendDateItem = { id: this.selectedDividend.id, exDate: datestring };
        this.symbolService.reDividendDate(dividendDateItem).subscribe(res => {
          if (res) {
            {
              this.selectedEdit = undefined;
              this.resetForms();
              this.getAllDividend();
            }
          }
        });
        break;
      case 'paymentDate':
        let paymentdatestring = this.keyDateForPaymentDate.day + '-' + this.keyDateForDividendDate.month + '-' + this.keyDateForDividendDate.year;
        let paymentDateItem = { id: this.selectedDividend.id, paymentDate: paymentdatestring };
        this.symbolService.rePaymentDate(paymentDateItem).subscribe(res => {
          if (res) {
            {
              this.selectedEdit = undefined;
              this.resetForms();
              this.getAllDividend();
            }
          }
        });
        break;
      case 'frequency':
        let frequencyItem = { id: this.selectedDividend.id, frequencyTypeId: this.selectedDividend.frequencyTypeId };
        this.symbolService.reFrequencyType(frequencyItem).subscribe(res => {
          if (res) {
            {
              this.selectedEdit = undefined;
              this.resetForms();
              this.getAllDividend();
            }
          }
        });
        break;

    }
  }
}
