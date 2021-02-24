import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ContentService } from 'app/shared/services/content.service';
import { NotificationService } from 'app/shared/services/notification.service';

@Component({
  selector: 'app-previous-dividend-effects-list',
  templateUrl: './previous-dividend-effects-list.component.html',
  styleUrls: ['./previous-dividend-effects-list.component.scss']
})
export class PreviousDividendEffectsListComponent implements OnInit {
  @Input() symbol;
  @Input() allowedToSee;
  constructor(private contentService: ContentService,
    private cdRef: ChangeDetectorRef,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.getAllDividend();

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

  getAllDividend() {
    this.contentService.getPreviousDividendEffectList(this.symbol.id).subscribe(res => {
      if (res)
        this.rows = res;
      this.tempData = this.rows;
      this.toggle = false;
      this.cdRef.detectChanges();
    });
  }

  toggle;
  toggleDetail(event) {
    if (!this.allowedToSee && !this.toggle) {
      this.toggle = true;
      this.notificationService.warnNotAllowed();
    }
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
