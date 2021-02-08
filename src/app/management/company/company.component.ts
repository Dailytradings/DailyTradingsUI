import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0) {
        this.symbolTicker = params['id'];
      } else {
        console.log("refresh");
      }
    }, (error) => console.error(error));

    this.broadcastingService.symbolObservable.subscribe((x: any) => {
      this.symbolTicker = x.ticker;
      this.broadcastingService.emitTicker({ ticker: this.symbolTicker, logoUrl: x.logoUrl })
    }, (error) => console.error(error));
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private broadcastingService: BroadcastingService) {
    authService.isPageAuthorized("Management");
  }

  symbolTicker;
  selectedEdit;
  selectEdit(data) {
    if (this.symbolTicker) {
      switch (data) {
        case 'earnings':
          this.router.navigate(['/management/earnings-management', this.symbolTicker]);
          break;
        case 'dividend':
          this.router.navigate(['/management/dividend-management', this.symbolTicker]);
          break;
        case 'otherPredictions':
          this.router.navigate(['/management/other-predictions-management', this.symbolTicker]);
          break;
        case 'competitors':
          this.router.navigate(['/management/competitors-management', this.symbolTicker]);
          break;
      }
    }
  }
}
