import { isPlatformBrowser } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from 'app/shared/services/content.service';
import { environment } from 'environments/environment';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-pride-corner-news-panel',
  templateUrl: './pride-corner-news-panel.component.html',
  styleUrls: ['./pride-corner-news-panel.component.scss']
})
export class PrideCornerNewsPanelComponent implements OnInit {


  @Input() newsCount;
  @Input() type;
  newsList;

  constructor(private contentService: ContentService) { }

  ngOnInit(): void {
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

  // Responsive Breakpoints
  public swiperResponsiveBreakpointsConfig: SwiperConfigInterface = {
    slidesPerView: 5,
    spaceBetween: 50,
    // init: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      1200: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      640: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 10,
      }
    }
  };








  
  updateUrl(image) {
    image.logoUrl = environment.notFoundLogoUrl;
    return true;
  }


}
