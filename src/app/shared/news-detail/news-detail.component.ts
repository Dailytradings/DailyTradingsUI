import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { BroadcastingService } from '../services/broadcasting.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.scss']
})
export class NewsDetailComponent implements OnInit {

  @Input() newsType;
  @Output() closeDetailPanel = new EventEmitter<boolean>();

  newsList;

  swiperEnabled = false;
  firstEntrance = true;
  constructor(private broadcastingService: BroadcastingService) {
    broadcastingService.selectedNewsId.subscribe(data => {
      this.swiperEnabled = false;
      // newslist içerisinden id'si data'ya eşit olanı bul selected hale getir.
      this.swiperEnabled = true;
    })
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
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 0,
      }
    }
  };


  ngOnInit(): void {
    // datayı newsType'a göre cek
  }

  public publicOpenPanel() {
    this.firstEntrance = true;
    setTimeout(() => {
      this.firstEntrance = false;
    }, 250);
  }

  closePanel() {
    if (!this.firstEntrance) {
      console.log(this.firstEntrance);
      this.closeDetailPanel.emit(true);
    }
  }


}
