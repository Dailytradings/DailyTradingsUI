import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { ContentService } from './../../shared/services/content.service';

@Component({
  selector: 'app-earnings-page',
  templateUrl: './earnings-page.component.html',
  styleUrls: ['./earnings-page.component.scss']
})
export class EarningsPageComponent implements OnInit {
  allowedToSee;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private contentService: ContentService, private cdRef: ChangeDetectorRef, private authService: AuthService, private broadcastingService: BroadcastingService) {
    broadcastingService.logOutObservable.subscribe(() => this.checkDataVisibilityPermission());
  }

  checkDataVisibilityPermission() {
    this.allowedToSee = this.authService.isAuthenticated("EarningsOpportunities");
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.checkDataVisibilityPermission();
    }
  }


}
