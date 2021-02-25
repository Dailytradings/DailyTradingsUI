import { Component, Input, OnInit } from '@angular/core';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-historical-analysis',
  templateUrl: './historical-analysis.component.html',
  styleUrls: ['./historical-analysis.component.scss']
})
export class HistoricalAnalysisComponent implements OnInit {

  @Input() keyDateForAnalysis;
  @Input() symbol: any;
  historicalAnalysis: any;
  allowedToSee;
  constructor(private symbolService: SymbolService, private broadcastingService: BroadcastingService) {
    this.allowedToSee = true;
   }

  ngOnInit(): void {
    this.broadcastingService.reportDateFromEarningsObservable.subscribe((x: any) => {
      this.historicalAnalysis = undefined;
      this.keyDateForAnalysis = { year:x.year, month: x.month, day: x.day };
      this.Changed();
    });
  }
  Changed() {
    this.historicalAnalysis = undefined;
    if (this.keyDateForAnalysis)
      this.symbolService.getEarningsHistoricalAnalysis(this.symbol.ticker, (this.keyDateForAnalysis.day + "-" + this.keyDateForAnalysis.month + "-" + this.keyDateForAnalysis.year)).subscribe(x => {
          this.historicalAnalysis = x;
      });
    else
      console.error("Bir Tarih Seç")
  }

}
