import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-panel',
  templateUrl: './ad-panel.component.html',
  styleUrls: ['./ad-panel.component.scss']
})
export class AdPanelComponent implements OnInit {

  @Input() width;
  @Input() height;
  @Input() percentage;
  @Input() adType;
  adHtml;
  constructor() { }

  ngOnInit(): void {
if(this.adType) {
  this.adHtml = `<span>` + this.adType +`</span>`
} else {
  this.adHtml = `<span>REKLAM</span>`
}
  }

}
