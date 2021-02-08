import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'app/shared/configs/ngb-date-custom-parser-formatter';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-keystats',
  templateUrl: './keystats.component.html',
  styleUrls: ['./keystats.component.scss']
})
export class KeystatsComponent implements OnInit {

  @Input() symbol: any;
  keystats: any;
  @Output() sectionPosition = new EventEmitter();
  pickerNextDividendDateVariable;
  pickerExDividendDateVariable;
  pickerNextEarningsDateVariable;
  constructor(private symbolService: SymbolService, private element: ElementRef) { }

  ngOnInit(): void {
    this.symbolService.getKeyStats(this.symbol.id).subscribe(x => 
      {
        let nextDivDate = new Date(x.nextdividenddate);
        let exDivDate = new Date(x.exDividendDate);
        let nextEarnDate = new Date(x.nextEarningsDate);
        this.pickerNextDividendDateVariable =  { day: nextDivDate.getDate(), month: nextDivDate.getUTCMonth() + 1, year: nextDivDate.getUTCFullYear()};
        this.pickerExDividendDateVariable =  { day: exDivDate.getDate(), month: exDivDate.getUTCMonth() + 1, year: exDivDate.getUTCFullYear()};
        this.pickerNextEarningsDateVariable =  { day: nextEarnDate.getDate(), month: nextEarnDate.getUTCMonth() + 1, year: nextEarnDate.getUTCFullYear()};
       
        this.keystats = x;
      }, (error) => console.error(error)
      );
  }

  @HostListener("window:scroll", ['$event'])
  onScrool(event) {
    this.sectionPosition.emit({ name: "keystats", position: this.element.nativeElement.offsetTop });
  }
}
