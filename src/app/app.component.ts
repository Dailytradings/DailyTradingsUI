import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { SignalRService } from './shared/services/signalr.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(@Inject(PLATFORM_ID) private _platformId: Object,private router: Router, private signalRService: SignalRService) {
        if (isPlatformBrowser(this._platformId)) {
            setTimeout(() => {
                this.signalRService.startBaseHubConnection();
                this.signalRService.RealTimeOfferListener();
                this.signalRService.EarningsOfferListener();
                this.signalRService.ActivityNewsListener();
            }, 1000);
          }
    
    }

    ngOnInit() {
     if(isPlatformBrowser(this._platformId)) {
        this.subscription = this.router.events
        .pipe(
            filter(event => event instanceof NavigationEnd)
        )
        .subscribe(() => window.scrollTo(0, 0));
     }
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}