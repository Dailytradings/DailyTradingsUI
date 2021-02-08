import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ContentService } from 'app/shared/services/content.service';
import { SymbolService } from 'app/shared/services/symbol.service';

@Component({
  selector: 'app-realtime-table',
  templateUrl: './realtime-table.component.html',
  styleUrls: ['./realtime-table.component.scss']
})
export class RealtimeTableComponent implements OnInit {

  symbolList;
  @Input() selectedSymbol;
  realtimeDataList;
  constructor(private contentService: ContentService, private symbolService: SymbolService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.symbolService.getObservableSymbolList().subscribe(x => {
      this.symbolList = x;
    });
  }

  public selectRealTimeData($event) {
    this.selectedSymbol = $event.target.value;
    this.symbolService.getRealTimeData(this.selectedSymbol).subscribe(x => {
      this.realtimeDataList = x;
      this.cdRef.detectChanges();
    });
  }
}
