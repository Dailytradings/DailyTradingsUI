import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-upcoming-earnings',
  templateUrl: './upcoming-earnings.component.html',
  styleUrls: ['./upcoming-earnings.component.scss']
})
export class UpcomingEarningsComponent implements OnInit {

  upcomingEarningsList;

  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private contentService: ContentService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this._platformId)) {
      this.contentService.getUpcomingEarningsList().subscribe(res => {
        if (res)
          this.upcomingEarningsList = res;
        this.cdRef.detectChanges();
      });
    }
  }

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }


  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
}
