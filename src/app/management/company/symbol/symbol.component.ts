import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from 'app/shared/configs/ngb-date-custom-parser-formatter';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-symbol',
  templateUrl: './symbol.component.html',
  styleUrls: ['./symbol.component.scss']
})
export class SymbolComponent implements OnInit {

  @Input() symbol: any;
  @Input() exchanges: any;
  @Output() sectionPosition = new EventEmitter();
  fiscalYearStartDateVariable;
  fiscalEndDateVariable;
  constructor(private symbolService: SymbolService, private element: ElementRef) { }

  ngOnInit() {
    this.sectionPosition.emit({ name: "symbol", position: this.element.nativeElement.offsetTop });
    let fiscalYearStartDate = new Date(this.symbol.fiscalYearStartDate);
    let fiscalEndDate = new Date(this.symbol.fiscalEndDate);
    this.fiscalYearStartDateVariable =  { day: fiscalYearStartDate.getDate(), month: fiscalYearStartDate.getUTCMonth() + 1, year: fiscalYearStartDate.getUTCFullYear()};
    this.fiscalEndDateVariable =  { day: fiscalEndDate.getDate(), month: fiscalEndDate.getUTCMonth() + 1, year: fiscalEndDate.getUTCFullYear()};
  }

  @HostListener("window:scroll", ['$event'])
  onScrool(event) {
    this.sectionPosition.emit({ name: "symbol", position: this.element.nativeElement.offsetTop });
  }
}
