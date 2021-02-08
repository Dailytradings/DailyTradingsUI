import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-upcoming-earnings',
  templateUrl: './upcoming-earnings.component.html',
  styleUrls: ['./upcoming-earnings.component.scss']
})
export class UpcomingEarningsComponent implements OnInit {

  upcomingEarningsList;

  constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.contentService.getUpcomingEarningsList().subscribe(res => {
      if (res)
        this.upcomingEarningsList = res;
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
