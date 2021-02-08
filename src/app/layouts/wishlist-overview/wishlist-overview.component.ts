import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from 'app/shared/services/content.service';
@Component({
  selector: 'app-wishlist-overview',
  templateUrl: './wishlist-overview.component.html',
  styleUrls: ['./wishlist-overview.component.scss']
})
export class WishlistOverviewComponent implements OnInit {

  watchlistSymbolList;
  loadPanels = false;

  constructor(
    private broadcastingService: BroadcastingService,
    private authService: AuthService,
    private contentService: ContentService,
    private cdRef: ChangeDetectorRef,
  ) {
    authService.isPageAuthorized("Management");
    broadcastingService.emitTicker(undefined);
  }


  ngOnInit(): void {
    this.getWatchListOverview();
    this.broadcastingService.refreshWatchListOverviewObservable.subscribe(() => this.getWatchListOverview());
  }

  getWatchListOverview() {
    this.contentService.getWatchListSymbols().subscribe(res => {
      if (res)
        this.watchlistSymbolList = res;
      this.loadPanels = true;
      this.cdRef.detectChanges();
    });
  }

}
