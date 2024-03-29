import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, Inject } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { ContentService } from 'app/shared/services/content.service';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-other-predictions-from-websites-list',
  templateUrl: './other-predictions-from-websites-list.component.html',
  styleUrls: ['./other-predictions-from-websites-list.component.scss']
})
export class OtherPredictionsFromWebsitesListComponent implements OnInit {

  loadingApproved;

  @Input() symbol;
  @Input() allowedToSee;
  nextEarnings;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private symbolService: SymbolService,
    private cdRef: ChangeDetectorRef,
    private contentService: ContentService,
    private authService: AuthService) { 

    }

  ngOnInit(): void {
    this.getAllHistoricalEarnings();

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

  getAllHistoricalEarnings() {
    this.symbolService.getNextEarnings(this.symbol.id).subscribe(nextEarnings => {
        this.nextEarnings = nextEarnings;
        this.contentService.getPreviousEarningsWithOtherPredictions(this.symbol.id).subscribe(res => {
          if (res)
            this.rows = res;
          this.tempData = this.rows;
          this.cdRef.detectChanges();
          let elements =
            this.document.getElementsByClassName("logo-title");
          Array.prototype.forEach.call(elements, function (el) {
            el.parentElement.parentElement.style.paddingTop = '0px';
            el.parentElement.parentElement.style.paddingBottom = '0px';
          });
        });
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


}
