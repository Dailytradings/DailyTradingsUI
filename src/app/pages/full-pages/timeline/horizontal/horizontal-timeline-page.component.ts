import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentService } from 'app/shared/services/content.service';
import { TimelineElement } from './component/timeline-element';

@Component({
    selector: 'app-horizontal-timeline-page',
    templateUrl: './horizontal-timeline-page.component.html',
    styleUrls: ['./horizontal-timeline-page.component.scss']
})

export class HorizontalTimelinePageComponent implements OnInit {

     timeline: TimelineElement[];

    constructor(private contentService: ContentService, private cdRef: ChangeDetectorRef) { }

    ngOnInit() {
        // this.timeline = [
        //     { date: new Date(2020, 0, 16), selected: true, title: 'Horizontal Timeline', content: this.content },
        //     { date: new Date(2020, 1, 28), title: 'Event title here', content: this.content },
        //     { date: new Date(2020, 2, 20), title: 'Event title here', content: this.content },
        //     { date: new Date(2020, 4, 20), title: 'Event title here', content: this.content },
        //     { date: new Date(2020, 6, 9), title: 'Event title here', content: this.content },
        //     { date: new Date(2020, 7, 30), title: 'Event title here', content: this.content },
        //     { date: new Date(2020, 8, 15), title: 'Event title here', content: this.content },
        //     { date: new Date(2020, 10, 1), title: 'Event title here', content: this.content },
        //     { date: new Date(2020, 11, 10), title: 'Event title here', content: this.content },
        //     { date: new Date(2021, 0, 19), title: 'Event title here', content: this.content },
        //     { date: new Date(2021, 2, 3), title: 'Event title here', content: this.content },
        // ];
        // console.log(this.timeline);
        this.contentService.getHolidaysForTimeline().subscribe(res => {
            if (res){
                console.log(res);
                res.forEach(element => {
                    element.date = new Date(element.date);
                });
                this.timeline = res;
                console.log(this.timeline);
            }
            this.cdRef.detectChanges();
        });
    }

     content = `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum praesentium officia, fugit recusandae
     ipsa, quia velit nulla adipisci? Consequuntur aspernatur at, eaque hic repellendus sit dicta consequatur quae,
     ut harum ipsam molestias maxime non nisi reiciendis eligendi! Doloremque quia pariatur harum ea amet quibusdam
     quisquam, quae, temporibus dolores porro doloribus.`;

     
}
