import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';

@Component({
  selector: 'app-earnings-table',
  templateUrl: './earnings-table.component.html',
  styleUrls: ['./earnings-table.component.scss']
})
export class EarningsTableComponent implements OnInit {

  @Input() dataList:any;
  @Output() dataEmitter = new EventEmitter<Object>();
  @Output() reportDateSelectionEmitter = new EventEmitter<Object>();
  selectedData;
  selectedReportDate;
  selectedEarningsPickerDate;
  constructor(private broadcastingService: BroadcastingService) { }
  pipe = new DatePipe('en-US');
  ngOnInit(): void {
  }

  select(data) {
    this.selectedData = data;
    this.dataEmitter.emit(data);
  }

  clickedReportDate(date) {
    let x = { day: date.substring(8,10), month: date.substring(5,7), year: date.substring(0,4)};
    this.selectedReportDate = date;
    this.reportDateSelectionEmitter.emit(x);
    this.broadcastingService.emitReportDateFromEarnings(x)
 }

}
