import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';
import { AlertModalComponent } from '../../alert/alert-modal/alert-modal.component';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {

  symbol: any;
  // public
  public contentHeader: object;

  // row data
  public rows;

  @ViewChild('modal') modal: AlertModalComponent;

  public ColumnMode = ColumnMode;

  @ViewChild(DatatableComponent) table: DatatableComponent;
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
   * Constructor
   *
   * @param {HttpClient} http
   */
  constructor(private contentService: ContentService, private broadcastingService: BroadcastingService, private cdRef: ChangeDetectorRef, private authService: AuthService) {
    this.getWatchList();
  }


  getWatchList() {
    this.contentService.getWatchList().subscribe(x => {
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


  removeFromWatchList(id) {
    this.contentService.removeFromWatchList(id).subscribe(res => {
      if (res) {
        this.getWatchList();
        this.broadcastingService.emitRefrehWatchListOverview(true);
      }
    });
  }


  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }

  showAlertModal(symbol) {
    this.symbol = symbol;
    setTimeout(() => {
      this.modal.open();
    }, 100);
  }
}
