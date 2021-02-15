import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SwiperDirective, SwiperConfigInterface} from 'ngx-swiper-wrapper';
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
    breakpoints: {
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
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
        slidesPerView: 3,
        spaceBetween: 10,
      }
    }
  };


  ngOnInit(): void {
    // datayı newsType'a göre cek
  }

  closePanel() {
    this.closeDetailPanel.emit(true);
  }

}
