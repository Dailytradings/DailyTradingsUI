import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-competitor-comparison',
  templateUrl: './competitor-comparison.component.html',
  styleUrls: ['./competitor-comparison.component.scss']
})
export class CompetitorComparisonComponent implements OnInit {

  @Input() symbol;
  @Output() sectionPosition = new EventEmitter();
  earningsList: any;
  selectedEarnings: any;
  selectetionValue = 'null';
  competitorComparison = [];

  constructor(private symbolService: SymbolService, private element: ElementRef) { }

  ngOnInit(): void {
    this.symbolService.getEarningsList(this.symbol.id).subscribe(x => {
      if (x) {
        this.earningsList = x;
      }
    }, (error) => console.error(error));

    this.sectionPosition.emit({ name: "competitorComparison", position: this.element.nativeElement.offsetTop });
  }

  changeEarnings($event) {
    this.selectedEarnings = undefined;
    this.competitorComparison = undefined;
    this.symbolService.getEarnings($event.target.value).subscribe(x => {
      this.selectedEarnings = x;
      this.symbolService.getPeerComparison(this.symbol.id, this.selectedEarnings.id).subscribe(x => {
          this.competitorComparison = x;
      });
    });
  }

  @HostListener("window:scroll", ['$event'])
  onScrool(event) {
    this.sectionPosition.emit({ name: "competitorComparison", position: this.element.nativeElement.offsetTop });
  }


}
