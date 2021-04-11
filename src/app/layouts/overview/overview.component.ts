import { ChangeDetectorRef, Component, Inject, Input, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { SymbolService } from 'app/shared/services/symbol.service';
import { isPlatformBrowser, Location } from '@angular/common';
import { ContentService } from 'app/shared/services/content.service';
import { AlertModalComponent } from '../alert/alert-modal/alert-modal.component';
import { environment } from 'environments/environment';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { SeoService } from 'app/shared/services/seo.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  symbol: any;
  selectedPanel = 'opportunities';
  isBrowser;
  @ViewChild('modal') modal: AlertModalComponent;

  allowedToSee;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object,
  private seoService: SeoService,
    private router: Router,
    private route: ActivatedRoute,
    private symbolService: SymbolService,
    private contentService: ContentService,
    private broadcastingService: BroadcastingService,
    private location: Location,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
  ) { }


  checkDataVisibilityPermission() {
    this.allowedToSee = this.authService.isAuthenticated("Overview");
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.isBrowser = true;
      this.checkDataVisibilityPermission();
    } else {
      this.isBrowser = false;
    }

    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0) {
        if (params['id2'] && params['id2'].length > 0) {
          this.selectedPanel = params['id2'];
        }
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

    let path = this.router.url;
    let firstPartOfPath = path.substr(0, path.lastIndexOf("\/"))
    path = path.substr(0, firstPartOfPath.lastIndexOf("\/"))
    this.location.go(path + '/' + this.symbol.ticker + '/' + this.selectedEdit);
  }

  getSymbolFromTicker(ticker) {
    if (ticker) {
      this.symbol = undefined;
      this.contentService.getSymbolOverview(ticker, this.isBrowser).subscribe(response => {
        let path = this.router.url;
        let lastPartOfPath = path.substr(path.lastIndexOf("\/"), path.length - path.lastIndexOf("\/"))
        let firstPartOfPath = path.substr(0, path.lastIndexOf("\/"))
        
        // firstPartOfPath = firstPartOfPath.substr(path.lastIndexOf("\/"), path.length - path.lastIndexOf("\/"))
        
          path = path.substr(0, firstPartOfPath.lastIndexOf("\/"))

        this.location.go(path + '/' + ticker + lastPartOfPath);
        
        this.seoService.createMeta("description", "A high-level overview of "+ response.companyName + "("+ response.ticker +") stock. Stay up to date on the latest stock price, chart, news, analysis, fundamentals, trading and investment tools.");

        setTimeout(() => {
          this.symbol = response;
          this.cdRef.detectChanges();
          this.selectEdit(this.selectedPanel);
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
        }, 100);
      }, (error) => console.error(error));
    }
  }

  addToWatchList() {
    this.contentService.addToWatchList(this.symbol.id).subscribe(res => {
      if (res) {
        this.symbol.isMonitoring = true;
      }
      this.cdRef.detectChanges();
    });
  }

  removeFromWatchList() {
    this.contentService.removeFromWatchList(this.symbol.id).subscribe(res => {
      if (res) {
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


