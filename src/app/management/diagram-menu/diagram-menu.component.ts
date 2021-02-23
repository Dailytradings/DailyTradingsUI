import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-diagram-menu',
  templateUrl: './diagram-menu.component.html',
  styleUrls: ['./diagram-menu.component.scss']
})
export class DiagramMenuComponent implements OnInit {

  @Input() category;
  @Input() content;
  @Input() ticker;

  constructor(@Inject(DOCUMENT) private document: Document) {
   }

  ngOnInit(): void {
    this.openAccordion(this.category);
  }

  openAccordion(id) {
    var x = this.document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
      x.previousElementSibling.className += " w3-pale-blue";
    } else { 
      x.className = x.className.replace(" w3-show", "");
      x.previousElementSibling.className = 
      x.previousElementSibling.className.replace(" w3-pale-blue", "");
    }
  }

  redirect(cat, redirectPath) {
    if(cat === 'company' && this.category === 'company')
    redirectPath = redirectPath + this.ticker;
    else if (cat === 'company' && this.category !== 'company')
    redirectPath = '/management/company';
    return environment.baseFrontendUrl + redirectPath ;
  }
}
