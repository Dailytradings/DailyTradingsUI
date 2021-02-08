import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-dividend-table',
  templateUrl: './dividend-table.component.html',
  styleUrls: ['./dividend-table.component.scss']
})
export class DividendTableComponent implements OnInit {

  @Input() dataList:any;
  @Input() nextDividend: any;
  constructor() { }

  ngOnInit(): void {
  }
}
