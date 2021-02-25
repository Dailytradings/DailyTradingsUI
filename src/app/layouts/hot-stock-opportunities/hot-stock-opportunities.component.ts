import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { environment } from 'environments/environment';
import { ContentService } from './../../shared/services/content.service';

@Component({
  selector: 'app-hot-stock-opportunities',
  templateUrl: './hot-stock-opportunities.component.html',
  styleUrls: ['./hot-stock-opportunities.component.scss', '/assets/sass/libs/datatables.scss'],
  encapsulation: ViewEncapsulation.None
})
// 
export class HotStockOpportunitiesComponent implements OnInit {

  @Input() dataCount = 250;
  @Input() demo;
  // public
  public contentHeader: object;

  // row data
  public rows;
  today: Date = new Date();
  keyDateForOpportunities = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() };
  selectedTimeRange = 'Date';

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



  /**
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService: AuthService) {
    authService.isPageAuthorized("HotStockOpportunities");
    this.contentService.getHotStockOpportunities().subscribe(x => {
      this.rows = x;
      this.tempData = x;
      cdRef.detectChanges();
    });
  }

  changeTimeRange(timeRange) {
    this.selectedTimeRange = timeRange;
    this.getHotStockOpportunitiesWithDate(this.selectedTimeRange);
  }

  getHotStockOpportunitiesWithDate(timeRange = null) {
    if (!timeRange)
      this.selectedTimeRange = 'Date';
    let date = this.keyDateForOpportunities.day + '-' + this.keyDateForOpportunities.month + '-' + this.keyDateForOpportunities.year;
    this.contentService.getHotStockOpportunities(date, this.selectedTimeRange).subscribe(x => {
      this.rows = x;
      this.tempData = x;
      this.cdRef.detectChanges();
    });
  }


  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
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
