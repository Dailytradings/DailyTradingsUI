import { SymbolService } from 'app/shared/services/symbol.service';
import { ContentService } from 'app/shared/services/content.service';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { environment } from 'environments/environment';
import { Router, ActivatedRoute } from "@angular/router";
import { BroadcastingService } from 'app/shared/services/broadcasting.service';

@Component({
  selector: 'app-wishlist-opportunities-list',
  templateUrl: './wishlist-opportunities-list.component.html',
  styleUrls: ['./wishlist-opportunities-list.component.scss']
})
export class WishlistOpportunitiesListComponent implements OnInit {

  public contentHeader: object;

  // row data
  public rows;

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


  constructor(private broadcastingService: BroadcastingService, private contentService: ContentService, private cdRef: ChangeDetectorRef, private router : Router) {
    this.getWatchListOpportunities();
  }

  ngOnInit() {  }

  
  getWatchListOpportunities() {
    this.contentService.getWatchListOpportunities().subscribe(x => {
      console.log('data',x);
      this.rows = x;
      this.tempData = x;
      this.cdRef.detectChanges();
    });
}

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }

  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
}