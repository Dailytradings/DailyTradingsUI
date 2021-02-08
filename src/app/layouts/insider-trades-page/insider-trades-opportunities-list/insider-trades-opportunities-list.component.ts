import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-insider-trades-opportunities-list',
  templateUrl: './insider-trades-opportunities-list.component.html',
  styleUrls: ['./insider-trades-opportunities-list.component.scss']
})
export class InsiderTradesOpportunitiesListComponent implements OnInit {


  @Input() dataCount;
  @Input() demo;

 // public
 public contentHeader: object;
 selectedTimeRange = 'LastThreeDays';
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
 }



 changeTimeRange(timeRange) {
   this.selectedTimeRange = timeRange;
   this.getInsiderTrades(this.selectedTimeRange);
 }

 getInsiderTrades(timeRange = null) {
   if (!timeRange)
     this.selectedTimeRange = 'LastThreeDays';
   this.contentService.getInsiderTrades(this.selectedTimeRange, this.dataCount).subscribe(x => {
     this.rows = x;
     this.tempData = x;
     this.cdRef.detectChanges();
   });
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
   this.getInsiderTrades(this.selectedTimeRange);
   setInterval(() => { 
     this.getInsiderTrades(this.selectedTimeRange); 
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