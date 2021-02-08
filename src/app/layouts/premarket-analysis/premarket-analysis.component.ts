import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { ContentService } from 'app/shared/services/content.service';
import * as moment from 'moment';
import { interval, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-premarket-analysis',
  templateUrl: './premarket-analysis.component.html',
  styleUrls: ['./premarket-analysis.component.scss']
})
export class PremarketAnalysisComponent implements OnInit {

  today = new Date();
  pickDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 14, 0, 0);
  datePipe = new DatePipe('en-US');
  launchDate = this.datePipe.transform(this.pickDate, 'yyyy-MM-dd HH:mm');

  countdown: any;
  countdownFor = "Pre Market Açılışına Kalan Süre";

  private _unsubscribeAll: Subject<any>;


  // public
  public contentHeader: object;
  // row data
  public rows;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('tableResponsive') tableResponsive: any;

  public expanded: any = {};

  public editing = {};

  public chkBoxSelected = [];

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
    authService.isPageAuthorized("PreMarketAnalysis");
    // Set the defaults
    this.countdown = {
      weeks: '',
      days: '',
      hours: '',
      minutes: '',
      seconds: ''
    };
    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.getPremarketAnalysis();
    var dateHour = new Date().getHours();
    var pickHour = this.pickDate.getHours();
    if (pickHour <= dateHour) {
      this.pickDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate(), 19, 0, 0);
      pickHour = this.pickDate.getHours();
      if (pickHour <= dateHour) {
        this.pickDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate() + 1, 14, 0, 0);
      } else {
        this.countdownFor = "Pre Market Kapanışına Kalan Süre";
      }
      this.launchDate = this.datePipe.transform(this.pickDate, 'yyyy-MM-dd HH:mm');
    }
    console.log('pick', this.pickDate);
  }

  getPremarketAnalysis() {
    this.contentService.getPremarketAnalysis().subscribe(x => {
      this.rows = x;
      this.tempData = x;
      this.cdRef.detectChanges();
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    setInterval(() => {
      this.getPremarketAnalysis();
    }, 30000);

    const currDate = moment();
    const launchDate = moment(this.launchDate);
    let diff = launchDate.diff(currDate, 'seconds');
    this.countdown = this.calculateRemainingTime(diff);

    // Create a subscribable interval
    const countDown = interval(1000)
      .pipe(
        map(value => {
          return diff = diff - 1;
        }),
        map(value => {
          return this.calculateRemainingTime(value);
        })
      );

    // Subscribe to the countdown interval
    countDown
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(value => {
        this.countdown = value;
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

  private calculateRemainingTime(seconds): any {
    const timeLeft = moment.duration(seconds, 'seconds');

    return {
      weeks: timeLeft.asWeeks().toFixed(0),
      days: timeLeft.asDays().toFixed(0),
      hours: timeLeft.hours(),
      minutes: timeLeft.minutes(),
      seconds: timeLeft.seconds()
    };
  }

}