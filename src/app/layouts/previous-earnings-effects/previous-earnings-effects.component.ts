import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BroadcastingService } from '../../shared/services/broadcasting.service';
import { SymbolService } from '../../shared/services/symbol.service';
import { Location } from '@angular/common';
import { AuthService } from '../../shared/auth/auth.service';
import { environment } from 'environments/environment';
import * as moment from 'moment';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertObject } from 'app/shared/data/alertData';
import { NotificationService } from 'app/shared/services/notification.service';
import { AlertModalComponent } from '../alert/alert-modal/alert-modal.component';
import { ContentService } from 'app/shared/services/content.service';

@Component({
  selector: 'app-previous-earnings-effects',
  templateUrl: './previous-earnings-effects.component.html',
  styleUrls: ['./previous-earnings-effects.component.scss']
})
export class PreviousEarningsEffectsComponent implements OnInit {

  symbol;

  @ViewChild('modal') modal: AlertModalComponent;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private symbolService: SymbolService,
    private broadcastingService: BroadcastingService,
    private cdRef: ChangeDetectorRef,
    private location: Location,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private contentService: ContentService) {
    // authService.isPageAuthorized("Management");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0) {
        this.getSymbolFromTicker(params['id']);
      } else {
        this.broadcastingService.emitTicker(undefined);
      }
    }, (error) => console.error(error));

    this.broadcastingService.symbolObservable.subscribe((x: any) => {
      this.getSymbolFromTicker(x.ticker);
    }, (error) => console.error(error));
  
  
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
      this.contentService.getSymbolOverview(ticker).subscribe(response => {
        let path = this.router.url;
        let lastPartOfPath = path.substr(path.lastIndexOf("\/"), path.length - path.lastIndexOf("\/"))
        if (lastPartOfPath != "/previous-earnings-effects")
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
    this.contentService.getPreviousEarningsEffectList(this.symbol.id).subscribe(res => {
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
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }


  /**
   * Constructor
   *
   * @param {HttpClient} http
   */


  addToWatchList() {
    this.contentService.addToWatchList(this.symbol.id).subscribe(res => {
      if(res) {
        this.symbol.isMonitoring = true;
      }
        this.cdRef.detectChanges();
    });
  }

  removeFromWatchList() {
    this.contentService.removeFromWatchList(this.symbol.id).subscribe(res => {
      if(res) {
        this.symbol.isMonitoring = false;
      }
        this.cdRef.detectChanges();
    });
  }

  showAlertModal() {
    this.modal.open();
  }

}
