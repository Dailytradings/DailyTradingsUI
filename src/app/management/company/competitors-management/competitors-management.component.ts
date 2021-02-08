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
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-competitors-management',
  templateUrl: './competitors-management.component.html',
  styleUrls: ['./competitors-management.component.scss']
})
export class CompetitorsManagementComponent implements OnInit {

  symbol: any;
  selectedCompetitor;
  selectedEdit;
  weightFormSubmitted = false;
  weightForm: FormGroup;

  today: Date = new Date();
  keyDateForCompetitorDate = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private symbolService: SymbolService,
    private broadcastingService: BroadcastingService,
    private cdRef: ChangeDetectorRef,
    private location: Location,
    private authService: AuthService,
    private formBuilder: FormBuilder) {
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


    this.weightForm = this.formBuilder.group({
      weight: [0, [Validators.required]],
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
          this.getAllCompetitors();
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
        }, 100);
      }, (error) => console.error(error));
    }
  }


  getAllCompetitors() {
    this.symbolService.getCompetitors(this.symbol.id).subscribe(res => {
      if (res)
        this.rows = res;
        this.tempData = this.rows;
      this.cdRef.detectChanges();
    });
  }

  get wf() {
    return this.weightForm.controls;
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
      return d.ticker.toLowerCase().indexOf(val) !== -1 || !val;
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



  /**
   * Constructor
   *
   * @param {HttpClient} http
   */

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------


  SelectCompetitor(competitor) {
    if (this.selectedCompetitor == undefined || this.selectedCompetitor.id != competitor.id) {
      this.selectedCompetitor = competitor;
      this.selectedEdit = undefined;
      this.resetForms();
    }
  }

  removeSelectedCompetitor() {
    this.selectedCompetitor = undefined;
    this.selectedEdit = undefined;
    this.resetForms();
  }
  resetForms() {
    this.weightForm.reset();
    this.weightFormSubmitted = false;
  }

  selectEdit(editType) {
    this.selectedEdit = editType;
  }


  changeUser($event) {
    this.authService.getUserById($event.target.value).subscribe(res => {
      if (res)
        this.selectedCompetitor = res;
      this.cdRef.detectChanges();
    });
  }


  onSubmit() {
    switch (this.selectedEdit) {
      case 'weight':
        this.weightFormSubmitted = true;
        if (this.weightForm.invalid) {
          return;
        }
        let weightItem = { id: this.selectedCompetitor.id, weight: this.weightForm.value.weight };
        this.symbolService.reWeight(weightItem).subscribe(res => {
          if (res) {
            this.selectedEdit = undefined;
            this.resetForms();
            this.getAllCompetitors();
          }
        });
        break;
    }
  }

  searchCompetitor = [];


  private _observableList: BehaviorSubject<any[]> = new BehaviorSubject([]);

  get observableList(): Observable<any[]> { return this._observableList.asObservable() }

  addCompetitors() {
    let list = [];
      let symbol = this.symbol;
    this.searchCompetitor.forEach(function (item, index, object) {
      let data = {symbolId: symbol.id, competitorSymbolId: item.id};
      list.push(data);
    });
    console.log("list : ", list);
    this.symbolService.addCompetitors(list).subscribe(x => {
      this.getAllCompetitors();
    });
  }

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/management/company/' + ticker;
  }

  Search(keyword) {
    if (this.checkSearchKeywordIsValid(keyword.target.value)) {
      this.symbolService.getSymbolSearch(keyword.target.value).subscribe(res => {
        if (res) {
          var symbol = this.symbol;
          this.searchCompetitor.forEach(element => {
            res.forEach(function (item, index, object) {
              if (item.ticker === element.ticker || item.ticker === symbol.ticker) {
                object.splice(index, 1);
              }
            });
          });
          this.rows.forEach(element => {
            res.forEach(function (item, index, object) {
              if (item.ticker === element.ticker || item.ticker === symbol.ticker) {
                object.splice(index, 1);
              }
            });
          });
          let list = [];
          res.forEach(element => {
            list.push(element);
          });
          console.log('list', list);
          this._observableList.next(list);
        }
      });
    }
  }
  checkSearchKeywordIsValid(keyword): boolean {
    return keyword && keyword.length > 0 && keyword !== " ";
  }


  Remove(competitor) {
    // let alertObject: AlertObject = { title: competitor.ticker + ' Rakibini Silmek İstediğinizden Emin misiniz?', text: 'Bu İşlem Geri Alınamaz...', confirmButtonText: 'Evet', icon: 'warning' };
    // this.notificationService.confirmAlert(alertObject, (result) => {
    //   if (result)
    //     this.symbolService.removeCompetitor(competitor.id).subscribe(() => {
    //          this.resetForms();      
    //          this.getAllCompetitors();
    //     });
    // });

    this.symbolService.removeCompetitor(competitor.id).subscribe(() => {
      this.resetForms();
      this.getAllCompetitors();
    });
  }

}
