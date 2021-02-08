import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgbdSortableHeader, SortEvent } from '../directives/sortable.directive';
import { TableDataService } from '../services/table-data.service';

enum FieldType {
  text,
  number,
  date,
  button
}
enum EmitType {
  casual,
  select,
  create,
  update,
  delete
}

export interface dataConfig {
  columnName: string,
  fieldName: string,
  fieldType: FieldType,
  class: string,
  isEmitable: boolean,
  emitType: EmitType
}

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class DynamicTableComponent implements OnInit {
  dataList$: Observable<any[]>;
  total$: Observable<number>;
  @Input() tabledata: any;
  @Input() title = 'Table';
   headerData: any[];
  @Output() dataEmitter = new EventEmitter<any>();
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public tableDataService: TableDataService) { }

  ngOnInit() {
    this.tabledata.forEach(element => {
      element = this.fillNull(element);
    });
    this.tableDataService.initialize(this.tabledata);
    this.tableDataService.dataListObservable.subscribe(x => {
      this.dataList$ = this.tableDataService.dataList$;
      this.headerData = this.generateArray(this.getFirst()[0]);
    });

  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    this.tableDataService.sortColumn = column;
    this.tableDataService.sortDirection = direction;
  }

  onActivity(dataVal: any, dataConfigVal: any) {
    if (dataConfigVal.isEmitable) {
      let emitData = { data: dataVal, dataConfig: dataConfigVal }
      this.dataEmitter.emit(emitData);
    }
  }

  generateArray(obj) {
    if (obj)
      return Object.keys(obj).map((key) => { return key; });
  }

  fillNull(obj) {
    return Object.keys(obj).map((key) => {
      if (!obj[key])
        obj[key] = '';
      return obj;
    });
  }

  generateValueArray(obj) {
    if (obj)
      return Object.keys(obj).map((key) => { return obj[key] });
  }

  getFirst() {
    let firstData;
    let data = this.dataList$.pipe(map(x => x.slice(0, 1)));
    data.subscribe(x => {
      firstData = x;
    });
    return firstData;
  }
  emitData(data) {
    this.dataEmitter.emit(data);
  }
}
