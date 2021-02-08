import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AlertModalComponent } from 'app/layouts/alert/alert-modal/alert-modal.component';
import { AuthService } from 'app/shared/auth/auth.service';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';


@Component({
  selector: 'app-wishlist-overview-panel',
  templateUrl: './wishlist-overview-panel.component.html',
  styleUrls: ['./wishlist-overview-panel.component.scss']
})
export class WishlistOverviewPanelComponent implements OnInit {

  
  @Input() symbol;

  @ViewChild('modal') modal: AlertModalComponent;
  
  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) {
    // authService.isPageAuthorized("Management");
  }

  ngOnInit(): void {
  }

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }
  
  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
}
