import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { environment } from 'environments/environment';
import { ContentService } from '../services/content.service';

@Component({
  selector: 'app-news-panel',
  templateUrl: './news-panel.component.html',
  styleUrls: ['./news-panel.component.scss']
})
export class NewsPanelComponent implements OnInit {

  @Input() newsCount;
  @Input() type;
  newsList;

  constructor(@Inject(PLATFORM_ID) private _platformId: Object, private contentService: ContentService) { }

  ngOnInit(): void {
   if(isPlatformBrowser(this._platformId)) {
    if (this.type) {
      switch(this.type) {
         case 'Earnings':
           this.contentService.getEarningsActivityNews(this.newsCount).subscribe(res => {
             if (res)
               this.newsList = res;
           });
           break;
           case 'Dividend':
             this.contentService.getDividendActivityNews(this.newsCount).subscribe(res => {
               if (res)
                 this.newsList = res;
             });
             break;
             case 'MainPanel':
               this.contentService.getMainPanelActivityNews(this.newsCount).subscribe(res => {
                 if (res)
                   this.newsList = res;
               });
               break;
               case 'OurEstimates':
                 this.contentService.getOurEstimatesActivityNews(this.newsCount).subscribe(res => {
                   if (res)
                     this.newsList = res;
                 });
                 break;
      }
     } else {
         this.newsList = [{ newsContentSuffix: "We sensed, 3 or more insiders purchased APPLE..." }, 
         { newsContentSuffix: "We detected an Insider Trade within AAPL init..." },
         { newsContentSuffix: "AAPL reported that $5,000,000 stocks purchase..." }]
       }
   }
  }


  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }
}
