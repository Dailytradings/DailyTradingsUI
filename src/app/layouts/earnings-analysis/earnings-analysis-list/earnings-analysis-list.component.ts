import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SymbolService } from 'app/shared/services/symbol.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-earnings-analysis-list',
  templateUrl: './earnings-analysis-list.component.html',
  styleUrls: ['./earnings-analysis-list.component.scss']
})
export class EarningsAnalysisListComponent implements OnInit {

  
  @Input() symbol;
  selectetionValue = 'null';
  selectedEarnings: any;
  earningsList: any;
  @Input() allowedToSee;

  constructor(private cdRef: ChangeDetectorRef,
    private symbolService: SymbolService) { }

  ngOnInit(): void {
    this.getAllEarnings();
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


  
  getAllEarnings() {
    this.selectedEarnings = undefined;
    this.symbolService.getEarningsList(this.symbol.id).subscribe(res => {
      if (res) {
        this.earningsList = res;
      }
    }, (error) => console.error(error));
  }

  changeEarnings($event) {
    this.selectedEarnings = undefined;
    console.log(this.selectetionValue)
    console.log($event.target.value);
    this.symbolService.getEarnings(this.selectetionValue).subscribe(x => {
      if (x) {
        this.selectedEarnings = x;
        this.symbolService.getPeerComparison(this.symbol.id, this.selectedEarnings.id).subscribe(res => {
          if (res) {
            this.rows = res;
            this.tempData = this.rows;
            this.cdRef.detectChanges();
          }
        });
      }
    });
  }

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }

  
  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
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
   * Constructor
   *
   * @param {HttpClient} http
   */


}
