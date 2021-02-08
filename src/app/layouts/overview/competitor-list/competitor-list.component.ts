import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { SymbolService } from 'app/shared/services/symbol.service';
import { Location } from '@angular/common';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-competitor-list',
  templateUrl: './competitor-list.component.html',
  styleUrls: ['./competitor-list.component.scss']
})
export class CompetitorListComponent implements OnInit {

  @Input() symbol: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private symbolService: SymbolService,
    private contentService: ContentService,
    private broadcastingService: BroadcastingService,
    private location: Location,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    
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

    this.getAllCompetitors();
  }

  
  getAllCompetitors() {
    this.symbolService.getCompetitors(this.symbol.id).subscribe(res => {
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

}
