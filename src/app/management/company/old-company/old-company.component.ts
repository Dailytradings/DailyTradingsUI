import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { SymbolService } from 'app/shared/services/symbol.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-old-company',
  templateUrl: './old-company.component.html',
  styleUrls: ['./old-company.component.scss']
})
export class OldCompanyComponent implements OnInit {

  symbol;
  waiting = false;
  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'].length > 0) {
        this.getSymbolFromTicker(params['id']);
      }  else {
        this.broadcastingService.emitTicker(undefined);
      }
    }, (error) => console.error(error));

    this.broadcastingService.symbolObservable.subscribe((x: any) => {
      this.getSymbolFromTicker(x.ticker);
    }, (error) => console.error(error));
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private symbolService: SymbolService,
    private authService: AuthService,
    private broadcastingService: BroadcastingService) {
    authService.isPageAuthorized("Management");
  }

  getSymbolFromTicker(ticker) {
    if (ticker) {
      this.waiting = true;
      this.symbol = undefined;
      this.symbolService.getSymbol(ticker).subscribe(response => {
        let path = this.router.url;
        let lastPartOfPath = path.substr(path.lastIndexOf("\/"), path.length - path.lastIndexOf("\/"))
        if (lastPartOfPath != "/oldcompany")
          path = path.substr(0, path.lastIndexOf("\/"))

        this.location.go(path + '/' + ticker);
        if (!response.company.primaryExchange)
          response.company.primaryExchange = { id: "null" };
        if (!response.exchange)
          response.exchange = { id: "null" };
        setTimeout(() => {
          this.symbol = response;
          this.broadcastingService.emitTicker({ ticker: ticker, logoUrl: response.logoUrl });
          this.waiting = false;
        }, 100);
      }, (error) => console.error(error));
    }
  }

}
