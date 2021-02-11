import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../shared/auth/auth.service';
import { ContentService } from './../../../shared/services/content.service';

@Component({
  selector: 'app-dividend-opportunities-list',
  templateUrl: './dividend-opportunities-list.component.html',
  styleUrls: ['./dividend-opportunities-list.component.scss']
})
export class DividendOpportunitiesListComponent implements OnInit {

  @Input() dataCount;
  @Input() demo;

  // public
  public contentHeader: object;

  // row data
  public rows;
  today: Date = new Date();
  keyDateForDividends = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() };
  selectedTimeRange = 'NextSevenDays';

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
  isBrowser = false;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService: AuthService) {
    if (isPlatformBrowser(_platformId)) {
      this.isBrowser = true;
    }
  }

  changeTimeRange(timeRange) {
    this.selectedTimeRange = timeRange;
    this.getDividendsWithDate(this.selectedTimeRange);
  }

  getDividendsWithDate(timeRange = null) {
    if (!timeRange)
      this.selectedTimeRange = 'Date';
    let date = this.keyDateForDividends.day + '-' + this.keyDateForDividends.month + '-' + this.keyDateForDividends.year;
    this.contentService.getDividendsWithDate(date, this.selectedTimeRange, this.dataCount).subscribe(x => {
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
    this.contentService.getDividendsWithDate("", "NextSevenDays", this.dataCount).subscribe(x => {
      this.rows = x;
      this.tempData = x;
      this.cdRef.detectChanges();
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

}
