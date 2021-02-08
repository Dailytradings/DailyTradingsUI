import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss']
})

export class EarningsComponent implements OnInit {

  @Input() symbol: any;
  selectedEarnings: any;
  earningsList: any;
  nextEarnings: any;
  fiscalEndDateVariable;
  reportDateVariable;
  selectedReportDate;
  keystats : any  = {reliabilityScore:undefined, grade:undefined};
  @Output() sectionPosition = new EventEmitter();

  constructor(private symbolService: SymbolService, private element: ElementRef) {
  }


  ngOnInit() {
    this.symbolService.getEarningsList(this.symbol.id).subscribe(x => {
     if(x){
      this.earningsList = x;
     }
    }, (error) => console.error(error));
    this.symbolService.getNextEarnings(this.symbol.id).subscribe(x => {
     if(x) {
      x.fiscalEndDate = x.fiscalEndDate.toString().split('T00:00:00')[0];
      x.reportDate = x.reportDate.toString().split('T00:00:00')[0];
      x.createdDate = x.createdDate?.toString().replace('T', ' ');
      x.modifiedTime = x.modifiedTime?.toString().replace('T', ' ');
      this.nextEarnings = x;
     }
    }, (error) => console.error(error));
    this.symbolService.getKeyStats(this.symbol.id).subscribe(x => 
      {
        if(x)
        this.keystats.reliabilityScore = x.reliabilityScore;
        this.keystats.grade = x.gradeType.typeName;
      }, (error) => console.error(error)
      );
    this.sectionPosition.emit({ name: "earnings", position: this.element.nativeElement.offsetTop });
  }

  generateArray(obj) {
    return Object.keys(obj).map((key) => { return key; });
  }

  getDataFromEmitter(data) {
    this.selectedEarnings = undefined;
    let fiscalEndDate = new Date(data.fiscalEndDate);
    let reportDate = new Date(data.reportDate);
    this.fiscalEndDateVariable = { day: fiscalEndDate.getDate(), month: fiscalEndDate.getUTCMonth() + 1, year: fiscalEndDate.getUTCFullYear() };
    this.reportDateVariable = { day: reportDate.getDate(), month: reportDate.getUTCMonth() + 1, year: reportDate.getUTCFullYear() };
    this.selectedEarnings = data;
  }

  getReportDateSelectionFromEmitter($event) {
    this.selectedReportDate = $event;
  }

  @HostListener("window:scroll", ['$event'])
  onScrool(event) {
    this.sectionPosition.emit({ name: "earnings", position: this.element.nativeElement.offsetTop });
  }
}
