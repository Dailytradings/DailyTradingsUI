import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ContentService } from 'app/shared/services/content.service';
import { AuthService } from '../../shared/auth/auth.service';
import { BroadcastingService } from '../../shared/services/broadcasting.service';
import { AlertModalComponent } from '../alert/alert-modal/alert-modal.component';

@Component({
  selector: 'app-previous-dividend-effects',
  templateUrl: './previous-dividend-effects.component.html',
  styleUrls: ['./previous-dividend-effects.component.scss']
})
export class PreviousDividendEffectsComponent implements OnInit {

  symbol;

  @ViewChild('modal') modal: AlertModalComponent;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private broadcastingService: BroadcastingService,
    private cdRef: ChangeDetectorRef,
    private location: Location,
    private authService: AuthService,
    private contentService: ContentService) {
    // authService.isPageAuthorized("Management");
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0) {
        this.getSymbolFromTicker(params['id']);
      } else {
        this.broadcastingService.emitTicker(undefined);
      }
    }, (error) => console.error(error));

    this.broadcastingService.symbolObservable.subscribe((x: any) => {
      this.getSymbolFromTicker(x.ticker);
    }, (error) => console.error(error));
  }
  
  getSymbolFromTicker(ticker) {
    if (ticker) {
      this.symbol = undefined;
      this.contentService.getSymbolOverview(ticker).subscribe(response => {
        let path = this.router.url;
        let lastPartOfPath = path.substr(path.lastIndexOf("\/"), path.length - path.lastIndexOf("\/"))
        if (lastPartOfPath != "/previous-dividend-effects")
          path = path.substr(0, path.lastIndexOf("\/"))

        this.location.go(path + '/' + ticker);
     
          this.symbol = response;
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
      }, (error) => console.error(error));
    }
  }

  addToWatchList() {
    this.contentService.addToWatchList(this.symbol.id).subscribe(res => {
      if(res) {
        this.symbol.isMonitoring = true;
      }
        this.cdRef.detectChanges();
    });
  }

  removeFromWatchList() {
    this.contentService.removeFromWatchList(this.symbol.id).subscribe(res => {
      if(res) {
        this.symbol.isMonitoring = false;
      }
        this.cdRef.detectChanges();
    });
  }

  showAlertModal() {
    this.modal.open();
  }

}
