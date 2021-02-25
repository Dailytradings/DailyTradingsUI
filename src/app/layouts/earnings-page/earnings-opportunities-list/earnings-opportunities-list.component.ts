import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { environment } from 'environments/environment';
import { ContentService } from './../../../shared/services/content.service';

@Component({
  selector: 'app-earnings-opportunities-list',
  templateUrl: './earnings-opportunities-list.component.html',
  styleUrls: ['./earnings-opportunities-list.component.scss']
})
export class EarningsOpportunitiesListComponent implements OnInit {

  @Input() dataCount;
  @Input() demo;
  @Input() allowedToSee;

  // public
  public contentHeader: object;

  // row data
  public rows = [];
  today: Date = new Date();
  keyDateForOpportunities = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() };
  selectedTimeRange = 'Today';

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('tableResponsive') tableResponsive: any;

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

  filterDataSet(event) {
    const val = event.toLowerCase();
    const temp = this.tempData.filter(function (d) {
      if (val === "earnings")
        return true;
      return d.reason.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    if (val === "earnings" || this.allowedToSee)
      this.rows = temp;
    else
      this.notificationService.warnNotAllowed();
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
   * toggleExpandRowResponsive
   *
   * @param row
   */
  toggleExpandRowResponsive(row) {
    this.tableResponsive.rowDetail.toggleExpandRow(row);
  }



  isBrowser = false;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService: AuthService, private broadcastingService: BroadcastingService, private notificationService: NotificationService) {
    if (isPlatformBrowser(_platformId)) {
      this.isBrowser = true;
    }
  }

  changeTimeRange($event) {
    let timeRange = $event.target.value;
    if (timeRange === 'Today' || this.allowedToSee) {
      this.selectedTimeRange = timeRange;
      this.getHotStockOpportunitiesWithDate(this.selectedTimeRange);
    } else {
      this.notificationService.warnNotAllowed();
    }
  }



  getHotStockOpportunitiesWithDate(timeRange = null) {
    if (!timeRange)
      this.selectedTimeRange = 'Date';
    let date = this.keyDateForOpportunities.day + '-' + this.keyDateForOpportunities.month + '-' + this.keyDateForOpportunities.year;
    this.contentService.getHotStockOpportunities(date, this.selectedTimeRange, this.dataCount).subscribe(x => {
      this.rows = x;
      this.tempData = x;
      this.cdRef.detectChanges();
    });
  }


  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }

  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.contentService.getHotStockOpportunities("", this.selectedTimeRange, this.dataCount).subscribe(x => {
        this.rows = x;
        this.tempData = x;
        this.cdRef.detectChanges();
      });
    }
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
}
