import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  @Input() symbol: any;
  annualIncome: any;
  selectedIncome: any;
  incomeList: any;
  @Output() sectionPosition = new EventEmitter();
  fiscalDateVariable;
  reportDateVariable;
  constructor(private symbolService: SymbolService, private element: ElementRef) { }

  ngOnInit(): void {
    this.selectedIncome = null;
    this.symbolService.getIncome(this.symbol.id).subscribe(x => {
      let list = x;
      list.forEach((element, index) => {
        element.fiscalDate = element.fiscalDate.toString().split('T00:00:00')[0];
      });
      list.forEach((element, index) => {
        if (element.isAnnual) {
          this.annualIncome = element;
          list.splice(index, 1);
        }
      });
      this.incomeList = list;
    }, (error) => console.error(error));
  }

  selectIncome(income) {
    let reportDate = new Date(income.reportDate);
    let fiscalDate = new Date(income.fiscalDate);
    this.reportDateVariable =  { day: reportDate.getDate(), month: reportDate.getUTCMonth() + 1, year: reportDate.getUTCFullYear()};
    this.fiscalDateVariable =  { day: fiscalDate.getDate(), month: fiscalDate.getUTCMonth() + 1, year: fiscalDate.getUTCFullYear()};
    this.selectedIncome = income;
  }

  @HostListener("window:scroll", ['$event'])
  onScrool(event) {
    this.sectionPosition.emit({ name: "income", position: this.element.nativeElement.offsetTop });
  }
}
