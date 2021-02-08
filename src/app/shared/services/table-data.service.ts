import {Injectable, PipeTransform} from '@angular/core';

import {BehaviorSubject, Observable, of, Subject} from 'rxjs';

import {DecimalPipe} from '@angular/common';
import {debounceTime, delay, switchMap, tap} from 'rxjs/operators';
import {SortDirection} from '../directives/sortable.directive';
import { analytics } from 'firebase';

interface SearchResult {
  dataList: any[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(dataList: any[], column: string, direction: string): any[] {
  if (direction === '') {
    return dataList;
  } else {
    return [...dataList].sort((a, b) => {
      const res = compare(a[column], b[column]);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(data: any, term: string, pipe: PipeTransform) {
  let returnValue = false;
   generateValueArray(data).forEach((element:string) => {
    if(!returnValue) {
      returnValue = element.toString().toLowerCase().includes(term);
    }
  });
  return returnValue;
}
function generateValueArray(obj) {
  return Object.keys(obj).map((key) => { return obj[key] });
}
@Injectable({providedIn: 'root'})
export class TableDataService {
  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _dataList$ = new BehaviorSubject<any[]>([]);
  private _total$ = new BehaviorSubject<number>(0);
  public dataListObservable = new Subject<Object>();

  public emitDataList(val) {
    this.dataListObservable.next(val);
  }
  private _state: State = {
    page: 1,
    pageSize: 4,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };

  constructor(private pipe: DecimalPipe) {}

  initialize(data) {
    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search(data)),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._dataList$.next(result.dataList);
      this._total$.next(result.total);
      this.emitDataList(result.dataList);
    });
    this._search$.next();
  }

  get dataList$() { return this._dataList$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }
  get page() { return this._state.page; }
  get pageSize() { return this._state.pageSize; }
  get searchTerm() { return this._state.searchTerm; }

  set page(page: number) { this._set({page}); }
  set pageSize(pageSize: number) { this._set({pageSize}); }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(data): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let dataList = sort(data, sortColumn, sortDirection);

    // 2. filter
    dataList = dataList.filter(data => matches(data, searchTerm, this.pipe));
    const total = dataList.length;

    // 3. paginate
    dataList = dataList.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({dataList: dataList, total});
  }
}
