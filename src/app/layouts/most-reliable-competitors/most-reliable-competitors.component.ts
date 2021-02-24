import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-most-reliable-competitors',
  templateUrl: './most-reliable-competitors.component.html',
  styleUrls: ['./most-reliable-competitors.component.scss']
})
export class MostReliableCompetitorsComponent implements OnInit {

  sortingIncrease = false;

  constructor(
    private contentService: ContentService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.getAllCompetitors();
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

  getAllCompetitors() {
    this.contentService.getMostReliableCompetitorList().subscribe(res => {
      if (res)
        this.rows = res;
      this.tempData = this.rows;
      this.cdRef.detectChanges();
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



  /**
   * Constructor
   *
   * @param {HttpClient} http
   */

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }

  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }


  sortFloatIncrease(a, b) { return 0 - (parseFloat(a.reliabilityScore) > parseFloat(b.reliabilityScore) ? 1 : -1) };
  sortFloatDecrease(a, b) { return 0 - (parseFloat(a.reliabilityScore) > parseFloat(b.reliabilityScore) ? -1 : 1) };

  sort() {
    this.sortingIncrease = !this.sortingIncrease;
    this.rows = undefined;
    this.cdRef.detectChanges();
    if (this.sortingIncrease) {
      // filter our data
      // const temp = this.rows.sort(function (a, b) {
      //   return 0 - (parseFloat(a.reliabilityScore) > parseFloat(b.reliabilityScore) ? -1 : 1);
      // });
      this.rows = this.tempData.sort(this.sortFloatIncrease);
      this.cdRef.detectChanges();
    } else {
      // filter our data
      console.log(this.sortingIncrease);
      // const temp = this.rows.sort(function (a, b) {
      //   return 0 - (parseFloat(a.reliabilityScore) > parseFloat(b.reliabilityScore) ? 1 : -1);
      // });

      this.rows = this.tempData.sort(this.sortFloatDecrease);
      // update the rows
      this.cdRef.detectChanges();
    }
  }
}
