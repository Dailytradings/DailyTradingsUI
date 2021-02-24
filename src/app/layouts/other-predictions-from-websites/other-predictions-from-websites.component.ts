import { isPlatformBrowser, Location } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'app/shared/services/content.service';
import { NotificationService } from 'app/shared/services/notification.service';
import { AuthService } from '../../shared/auth/auth.service';
import { BroadcastingService } from '../../shared/services/broadcasting.service';
import { AlertModalComponent } from '../alert/alert-modal/alert-modal.component';

@Component({
  selector: 'app-other-predictions-from-websites',
  templateUrl: './other-predictions-from-websites.component.html',
  styleUrls: ['./other-predictions-from-websites.component.scss']
})
export class OtherPredictionsFromWebsitesComponent implements OnInit {

  symbol;

  @ViewChild('modal') modal: AlertModalComponent;
  allowedToSee;
  constructor(@Inject(PLATFORM_ID) private _platformId: Object,
    private router: Router,
    private route: ActivatedRoute,
    private broadcastingService: BroadcastingService,
    private cdRef: ChangeDetectorRef,
    private location: Location,
    private authService: AuthService,
    private contentService: ContentService,
    private notificationService: NotificationService) {
  }


  checkDataVisibilityPermission() {
    this.allowedToSee = this.authService.isAuthenticated("OtherPredictionsFromWebsites");
    this.cdRef.detectChanges();
  }

  ngOnInit() {
    if (isPlatformBrowser(this._platformId)) {
      this.checkDataVisibilityPermission();
    }
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
        if (lastPartOfPath != "/other-predictions-from-websites")
          path = path.substr(0, path.lastIndexOf("\/"))

        this.location.go(path + '/' + ticker);

        setTimeout(() => {
          this.symbol = response;
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
          this.cdRef.detectChanges();
        }, 100);
      }, (error) => console.error(error));
    }
  }

  focusSearch() {
    this.broadcastingService.emitSearch(true);
  }


  addToWatchList() {
    if (this.allowedToSee) {
      this.contentService.addToWatchList(this.symbol.id).subscribe(res => {
        if (res) {
          this.symbol.isMonitoring = true;
        }
        this.cdRef.detectChanges();
      });
    } else {
      this.notificationService.warnNotAllowed();
    }
  }

  removeFromWatchList() {
    if (this.allowedToSee) {
      this.contentService.removeFromWatchList(this.symbol.id).subscribe(res => {
        if (res) {
          this.symbol.isMonitoring = false;
        }
        this.cdRef.detectChanges();
      });
    } else {
      this.notificationService.warnNotAllowed();
    }

  }

  showAlertModal() {
    if (this.allowedToSee) {
      this.modal.open();
    } else {
      this.notificationService.warnNotAllowed();
    }
  }

}
