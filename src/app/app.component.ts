import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { SignalRService } from './shared/services/signalr.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(private router: Router, private signalRService: SignalRService) {
        setTimeout(() => {
            this.signalRService.startBaseHubConnection();
            this.signalRService.RealTimeOfferListener();
            this.signalRService.EarningsOfferListener();
            this.signalRService.ActivityNewsListener();
        }, 1000);
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => window.scrollTo(0, 0));
    }


    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }



}