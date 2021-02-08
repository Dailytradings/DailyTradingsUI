import { Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { SymbolService } from 'app/shared/services/symbol.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { AlertObject } from '..//..//..//shared/data/alertData'


@Component({
  selector: 'app-competitors',
  templateUrl: './competitors.component.html',
  styleUrls: ['./competitors.component.scss']
})
export class CompetitorsComponent implements OnInit {

  @Input() symbol;
  @Output() sectionPosition = new EventEmitter();

  selectedCompetitors = [];
  searchCompetitor = [];


  private _observableList: BehaviorSubject<any[]> = new BehaviorSubject([]);

  get observableList(): Observable<any[]> { return this._observableList.asObservable() }

  constructor(
    private symbolService: SymbolService,
    private element: ElementRef,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getCompetitors();
    this.sectionPosition.emit({ name: "competitors", position: this.element.nativeElement.offsetTop });
  }

  getCompetitors() {
    this.searchCompetitor = [];
    this.selectedCompetitors = [];
    this._observableList.next([]);
    this.symbolService.getCompetitors(this.symbol.id).subscribe(x => {
      if (x) {
        console.log(x);
        x.forEach(element => {
          this.selectedCompetitors.push(element);
        });
      }
    }
    );
  }

  SaveChanges() {
    console.log('SearchCompetitor', this.searchCompetitor);
    console.log('SelectCompetitor', this.selectedCompetitors);
    let list = [];
    this.selectedCompetitors.forEach(function (item, index, object) {
      list.push(item);
    });
    this.searchCompetitor.forEach(function (item, index, object) {
      list.push(item);
    });
    console.log("list : ", list);
    this.symbolService.updateCompetitors(list).subscribe(x => {
      this.getCompetitors();
    });
  }

  Remove(id, ticker) {
    // let alertObject: AlertObject = { title: ticker + ' Rakibini Silmek İstediğinizden Emin misiniz?', text: 'Bu İşlem Geri Alınamaz...', confirmButtonText: 'Evet', icon: 'warning' };
    // this.notificationService.confirmAlert(alertObject, (result) => {
    //   if (result)
    //     this.symbolService.removeCompetitor(id).subscribe(() => {
    //       this.selectedCompetitors.forEach(function (item, index, object) {
    //         if (item.id === id)
    //           object.splice(index, 1);
    //       });
    //     });
    // });

    this.symbolService.removeCompetitor(id).subscribe(() => {
      this.selectedCompetitors.forEach(function (item, index, object) {
        if (item.id === id)
          object.splice(index, 1);
      });
    });
  }

  Search(keyword) {
    if (this.checkSearchKeywordIsValid(keyword.target.value)) {
      this.symbolService.getSymbolSearch(keyword.target.value).subscribe(x => {
        if (x) {
          let list = [];
          let symbol = this.symbol;
          this.selectedCompetitors.forEach(element => {
            x.forEach(function (item, index, object) {
              if (item.ticker === element.competitorTicker || item.ticker === symbol.ticker) {
                object.splice(index, 1);
              }
            });
          });
          this.searchCompetitor.forEach(element => {
            x.forEach(function (item, index, object) {
              if (item.ticker === element.competitorTicker || item.ticker === symbol.ticker) {
                object.splice(index, 1);
              }
            });
          });
          x.forEach(element => {
            let data = { symbolId: this.symbol.id, competitorSymbolId: element.id, companyName: element.companyName, competitorTicker: element.ticker, isValid: false, modifiedByFullName: null, modifiedTime: null };
            list.push(data);
          });
          this._observableList.next(list);
        }
      });
    }
  }
  checkSearchKeywordIsValid(keyword): boolean {
    return keyword && keyword.length > 0 && keyword !== " ";
  }

  selectCompetitor(event: any) {
    console.log(event);
  }

  @HostListener("window:scroll", ['$event'])
  onScrool(event) {
    this.sectionPosition.emit({ name: "competitors", position: this.element.nativeElement.offsetTop });
  }

}
