import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-dividend',
  templateUrl: './dividend.component.html',
  styleUrls: ['./dividend.component.scss']
})
export class DividendComponent implements OnInit {

  @Input() symbol: any;
  nextDividend: any;
  dividendList: any;
  @Output() sectionPosition = new EventEmitter();

  constructor(private symbolService: SymbolService, private element: ElementRef) { }
  ngOnInit() {
    this.symbolService.getDividendList(this.symbol.id).subscribe(x => {
      x.forEach((element) => {
        element.exDate = element.exDate.toString().split('T00:00:00')[0];
        element.paymentDate = element.paymentDate.toString().split('T00:00:00')[0];
      });
      this.dividendList = x;
      this.symbolService.getNextDividend(this.symbol.id).subscribe(element => {
        if(element){
          element.exDate = element.exDate.toString().split('T00:00:00')[0];
          element.paymentDate = element.paymentDate.toString().split('T00:00:00')[0];
        this.nextDividend = element;
        }
      });
    }, (error) => console.error(error));
    this.sectionPosition.emit({ name: "dividend", position: this.element.nativeElement.offsetTop });
  }

  @HostListener("window:scroll", ['$event'])
  onScrool(event) {
    this.sectionPosition.emit({ name: "dividend", position: this.element.nativeElement.offsetTop });
  }
}
