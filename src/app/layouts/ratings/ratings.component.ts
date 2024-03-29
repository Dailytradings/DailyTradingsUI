import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentService } from './../../shared/services/content.service'
import { AuthService } from '../../shared/auth/auth.service';


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {

    // public
    public contentHeader: object;

    // row data
    public rows;
    today: Date = new Date();
    keyDateForDividends = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() };
    selectedTimeRange = 'LastSevenDays';
  
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
    constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService: AuthService) {
      authService.isPageAuthorized("Ratings");
      this.getAnalystRatingsWithDate(this.selectedTimeRange);
    }
  
    changeTimeRange(timeRange) {
      this.selectedTimeRange = timeRange;
      this.getAnalystRatingsWithDate(this.selectedTimeRange);
    }
  
    getAnalystRatingsWithDate(timeRange = null) {
      if (!timeRange)
        this.selectedTimeRange = 'Date';
      let date = this.keyDateForDividends.day + '-' + this.keyDateForDividends.month + '-' + this.keyDateForDividends.year;
      this.contentService.getAnalystRatingsWithDate(date, this.selectedTimeRange).subscribe(x => {
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
 