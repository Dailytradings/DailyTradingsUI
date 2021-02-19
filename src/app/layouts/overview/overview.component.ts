import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { SymbolService } from 'app/shared/services/symbol.service';
import { Location } from '@angular/common';
import { ContentService } from 'app/shared/services/content.service';
import { AlertModalComponent } from '../alert/alert-modal/alert-modal.component';
import { environment } from 'environments/environment';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  symbol: any;

  @ViewChild('modal') modal: AlertModalComponent;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private symbolService: SymbolService,
    private contentService: ContentService,
    private broadcastingService: BroadcastingService,
    private location: Location,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) {
  }


  ngOnInit(): void {
    this.authService.isAuthenticated("Management");
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0) {
        this.getSymbolFromTicker(params['id']);
      } else {
        this.broadcastingService.emitTicker(undefined);
      }

      this.broadcastingService.symbolObservable.subscribe((x: any) => {
        this.getSymbolFromTicker(x.ticker);
      });
    }, (error) => console.error(error));
  }

selectedEdit;
selectEdit(edit) {
  this.selectedEdit = edit;
}

  getSymbolFromTicker(ticker) {
    if (ticker) {
      this.symbol = undefined;
      this.contentService.getSymbolOverview(ticker).subscribe(response => {
        let path = this.router.url;
        //    let lastPartOfPath = path.substr(path.lastIndexOf("\/"), path.length - path.lastIndexOf("\/"))
        path = path.substr(0, path.lastIndexOf("\/"))

        this.location.go(path + '/' + ticker);
        setTimeout(() => {
          this.symbol = response;
          this.cdRef.detectChanges();
          this.selectEdit('opportunities');
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
        }, 100);
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

  getRedirectUrl(ticker) {
    return environment.baseFrontendUrl + '/stock/overview/' + ticker;
  }

}


