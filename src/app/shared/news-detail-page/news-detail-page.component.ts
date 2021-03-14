import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentService } from 'app/shared/services/content.service';

@Component({
  selector: 'app-news-detail-page',
  templateUrl: './news-detail-page.component.html',
  styleUrls: ['./news-detail-page.component.scss']
})
export class NewsDetailPageComponent implements OnInit {

  newsList;
  tempData;
  earningsFilter;
  announcementFilter;
  dividendFilter;
  insiderFilter;
  ratingsFilter;
  constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.contentService.getMainPanelActivityNews(20).subscribe(res => {
      if (res)
        this.newsList = res;
      this.tempData = this.newsList;
      this.cdRef.detectChanges();
    });
  }

  filtering;
  filterUpdate(data) {
    switch (data) {
      case 'E':
        this.earningsFilter = !this.earningsFilter;
        break;
      case 'A':
        this.announcementFilter = !this.announcementFilter;
        break;
      case 'D':
        this.dividendFilter = !this.dividendFilter;
        break;
      case 'I':
        this.insiderFilter = !this.insiderFilter;
        break;
      case 'R':
        this.ratingsFilter = !this.ratingsFilter;
        break;
    }
    this.filtering = true;
    if (!this.earningsFilter && !this.announcementFilter && !this.dividendFilter && !this.insiderFilter && !this.ratingsFilter) {
      this.newsList = this.tempData;
    } else {
      let earningsData, announcementData, dividendData, insiderData, ratingsData;
      if (this.earningsFilter) {
        earningsData = this.tempData.filter(function (d) {
          return d.newsCode.indexOf("E") !== -1;
        });
      }
      if (this.announcementFilter) {
        announcementData = this.tempData.filter(function (d) {
          return d.newsCode.indexOf("A") !== -1;
        });
      }
      if (this.dividendFilter) {
        dividendData = this.tempData.filter(function (d) {
          return d.newsCode.indexOf("D") !== -1;
        });
      }
      if (this.insiderFilter) {
        insiderData = this.tempData.filter(function (d) {
          return d.newsCode.indexOf("I") !== -1;
        });
      }
      if (this.ratingsFilter) {
        ratingsData = this.tempData.filter(function (d) {
          return d.newsCode.indexOf("R") !== -1;
        });
      }

      let firstData = '';
      if (earningsData) {
        firstData = 'E';
        this.newsList = earningsData;
      }
      else if (announcementData) {
        firstData = 'A';
        this.newsList = announcementData;
      }
      else if (dividendData) {
        firstData = 'D';
        this.newsList = dividendData;
      }
      else if (insiderData) {
        firstData = 'I';
        this.newsList = insiderData;
      }
      else if (ratingsData) {
        firstData = 'R';
        this.newsList = ratingsData;
      }
      else {
        firstData = 'N';
        this.newsList = null;
      }

      switch (firstData) {
        case 'E':
          if (announcementData)
            this.newsList.push(...announcementData);
          if (dividendData)
            this.newsList.push(...dividendData);
          if (insiderData)
            this.newsList.push(...insiderData);
          if (ratingsData)
            this.newsList.push(...ratingsData);
          break;
        case 'A':
          if (dividendData)
            this.newsList.push(...dividendData);
          if (insiderData)
            this.newsList.push(...insiderData);
          if (ratingsData)
            this.newsList.push(...ratingsData);
          break;
        case 'D':
          if (insiderData)
            this.newsList.push(...insiderData);
          if (ratingsData)
            this.newsList.push(...ratingsData);
          break;
        case 'I':
          if (ratingsData)
            this.newsList.push(...ratingsData);
          break;
      }
      if (this.sortingValue !== "default")
        this.sort(this.sortingValue);
      this.filtering = false;
    }
    // filter our data

  }

  sortingValue = "default";
  sort($event) {
    let sorted;
    if($event.target)
    this.sortingValue = $event.target.value
    switch (this.sortingValue) {
      case 'Ascending Date':
        sorted = this.newsList.sort((a, b) => (a.createDate > b.createDate) ? 1 : ((b.createDate > a.createDate) ? -1 : 0))
        break;
      case 'Descending Date':
        sorted = this.newsList.sort((a, b) => (b.createDate > a.createDate) ? 1 : ((a.createDate > b.createDate) ? -1 : 0))
        break;
      default:
        this.filterUpdate(null);
        break;
    }
    if (this.sortingValue != "default")
      this.newsList = sorted;
  }

}
