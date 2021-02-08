import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbDate, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { DatatableData } from 'app/Template/data-tables/data/datatables.data';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContentService } from '../../shared/services/content.service'
import { RealtimeTableComponent } from '../hot-stock-opportunities/realtime-table/realtime-table.component';

@Component({
  selector: 'app-observable-opportunities',
  templateUrl: './observable-opportunities.component.html',
  styleUrls: ['./observable-opportunities.component.scss']
})
export class ObservableOpportunitieseComponent implements OnInit {


  // public
  public contentHeader: object;

  // row data
  public rows;
  today: Date = new Date();
  selectedSymbol = "null";
  keyDateForOpportunities = { day: this.today.getDate(), month: this.today.getUTCMonth() + 1, year: this.today.getUTCFullYear() };
  selectedTimeRange = 'Date';
  time: NgbTimeStruct;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;
  @ViewChild('tableResponsive') tableResponsive: any;
  @ViewChild('realTime') realTime:RealtimeTableComponent;

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
  constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService : AuthService) {
    authService.isPageAuthorized("RealtimeOpportunities")
    let date = new Date();
    this.time = { hour: 0, minute: 0, second: 0 };
    
     let timeVal = '00:00';
    this.contentService.getObserverOpportunities(timeVal).subscribe(x => {
      this.rows = x;
      this.tempData = x;
      cdRef.detectChanges();
    });
  }


  getObserverOpportunitiesWithTime() {
    if (this.time) {
      let timeVal = this.time.hour + ':' + this.time.minute;
      this.contentService.getObserverOpportunities(timeVal).subscribe(x => {
        this.rows = x;
        this.tempData = x;
        this.cdRef.detectChanges();
      });
    }
  }


  getRelatedHistoricalRealtimeData(symbolId) {
    this.selectedSymbol = symbolId;
    this.realTime.selectRealTimeData({target : {value : this.selectedSymbol}});
  }
  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit() {
    setInterval(() => { 
      this.getObserverOpportunitiesWithTime(); 
  }, 30000);
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
