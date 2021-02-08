import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContentService } from 'app/shared/services/content.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  bannerUrl = "../../../assets/img/banner/banner-18.jpg";

  mainNews;

  constructor(private router: Router, private contentService: ContentService) { }

  ngOnInit(): void {
    this.contentService.getBanner().subscribe(res => {
      if (res)
        this.bannerUrl = res;
    });

    this.contentService.getOurEstimatesActivityNews(1).subscribe(res => {
      if (res)
        this.mainNews = res;
    });
  }


  getMore(param) {
    switch (param) {
      case 'earnings':
        this.router.navigate(['/stock/earnings-page']);
        break;
      case 'dividend':
        this.router.navigate(['/stock/dividend-page']);
        break;
      case 'insiderTrades':
        this.router.navigate(['/stock/insider-trades-page']);
        break;
      case 'analystRatings':
        this.router.navigate(['/stock/analyst-ratings-page']);
        break;
    }
  }








}