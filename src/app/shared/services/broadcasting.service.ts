import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BroadcastingService {

  public symbolObservable = new Subject<Object>();
  public tickerObservable = new Subject<string>();
  public searchObservable = new Subject<boolean>();
  public logInObservable = new Subject<boolean>();
  public logOutObservable = new Subject<boolean>();
  public selectedNewsId = new Subject<Object>();
  public refreshAlertListObservable = new Subject<boolean>();
  public reportDateFromEarningsObservable = new Subject<Object>();
  public refreshWatchListOverviewObservable = new Subject<boolean>();
  constructor() { }

  public emitLogIn() {
    this.logInObservable.next(true);
  }
  public emitLogOut() {
    this.logOutObservable.next(true);
  }

  public emitSymbol(val) {
    this.symbolObservable.next(val);
  }
  public emitReportDateFromEarnings(val) {
    this.reportDateFromEarningsObservable.next(val);
  }
  public emitTicker(val) {
    this.tickerObservable.next(val);
  }
  emitSearch(val) {
    this.searchObservable.next(val);
  }
  emitRefrehAlertList(val) {
    this.refreshAlertListObservable.next(val);
  }
  emitRefrehWatchListOverview(val) {
    this.refreshWatchListOverviewObservable.next(val);
  }
  public emitNewsId(val) {
    this.selectedNewsId.next(val);
  }
}
