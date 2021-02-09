import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Inject, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { DOCUMENT } from '@angular/common';
import { CustomizerService } from '../services/customizer.service';
import { SymbolService } from '../services/symbol.service';
import { FormControl } from '@angular/forms';
import { LISTITEMS } from '../data/template-search';
import { Router } from '@angular/router';
import { BroadcastingService } from '../services/broadcasting.service';
import { AuthService } from '../auth/auth.service';
import { AlertListModalComponent } from 'app/layouts/alert/alert-list-modal/alert-list-modal.component';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  currentLang = "tr";
  selectedLanguageText = "turkish";
  selectedLanguageFlag = "./assets/img/flags/tr.png";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  logoUrl = 'assets/img/logo.png';
  menuPosition = 'Side';
  isSmallScreen = false;
  protected innerWidth: any;
  searchOpenClass = "";
  transparentBGClass = "";
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;
  displayOverlayMenu = false; // Vertical Side menu for screenSize < 1200
  
  languageList = [
    { key: 'tr', name: 'turkish', flagUrl: './assets/img/flags/tr.png' },
    { key: 'en', name: 'english', flagUrl: './assets/img/flags/us.png' },
    { key: 'es', name: 'spanish', flagUrl: './assets/img/flags/es.png' },
    { key: 'pt', name: 'portuguese', flagUrl: './assets/img/flags/pt.png' },
    { key: 'de', name: 'german', flagUrl: './assets/img/flags/de.png' },
  ]
  @ViewChild('search') searchElement: ElementRef;
  @ViewChildren('searchResults') searchResults: QueryList<any>;

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  searchTextEmpty = new EventEmitter<boolean>();

  @Output()
  searchResultEmitter = new EventEmitter<Object>();

  private _observableList: BehaviorSubject<any[]> = new BehaviorSubject([]);

  get observableList(): Observable<any[]> { return this._observableList.asObservable() }


  control = new FormControl();
  symbol = '+';
  public config: any = {};

  
  @ViewChild('modalList') modalList: AlertListModalComponent;

  constructor(public translate: TranslateService,
    private layoutService: LayoutService,
    private router: Router,
    private configService: ConfigService, private cdr: ChangeDetectorRef,
    private symbolService: SymbolService,
    private broadcastingService: BroadcastingService,
    private authService: AuthService) {

    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de|tr/) ? browserLang : "en");
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe(
      isShow => {
        this.hideSidebar = !isShow;
      });

      broadcastingService.searchObservable.subscribe(x => {
        setTimeout(() => {
        this.toggleSearchOpenClass(x);
        }, 100);
      });
  }

  ngOnInit() {
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
    this.broadcastingService.symbolObservable.subscribe((x: any) => {
      if(x) {
        this.symbol = x.ticker;
      this.logoUrl = x.logoUrl;
      } else {
        this.symbol = '+';
        this.logoUrl = 'assets/img/logo-dark.png';
      }
    });
    this.broadcastingService.tickerObservable.subscribe((x: any) => {
      if(x) {
        this.symbol = x.ticker;
      this.logoUrl = x.logoUrl;
      } else {
        this.symbol = '+';
        this.logoUrl = 'assets/img/logo-dark.png';
      }
    });

    
  }

  ngAfterViewInit() {
    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
    }
    else {
      this.isSmallScreen = false;
    }
  }

  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }

    if (this.config.layout.variant === "Light") {
      this.logoUrl = 'assets/img/logo-dark.png';
    }
    else {
      this.logoUrl = 'assets/img/logo.png';
    }

    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }

  onSearchKey(event: any) {
    if (this.checkSearchKeywordIsValid(event.target.value)) {
      try {
        this.symbolService.getSymbolSearch(event.target.value).subscribe(x => {
          if (x) {
            let list = x.filter(
              item =>
                item['searchKeyword']
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase()) === true
            ).slice(0, 10);
            this._observableList.next(list);
          }

          if (this.searchResults && this.searchResults.length > 0) {
            this.searchResults.first.host.nativeElement.classList.add('first-active-item');
          }

          if (event.target.value === "") {
            this.searchTextEmpty.emit(true);
          }
          else {
            this.searchTextEmpty.emit(false);
          }
        }, (error) => console.error(error));
      } catch (e) {
        console.error(e);
      }
    }
  }

  checkSearchKeywordIsValid(keyword): boolean {
    return keyword && keyword.length > 0 && keyword !== " ";
  }

  removeActiveClass() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.remove('first-active-item');
    }
  }

  onEscEvent() {
    this.control.setValue("");
    this.searchOpenClass = '';
    this.searchTextEmpty.emit(true);
  }

  onEnter() {
    if (this.searchResults && this.searchResults.length > 0) {
      let symbol = this.searchResults.first.value;
      this._observableList.next(null);
      if (symbol) {
        this.control.setValue("");
        this.searchOpenClass = '';
        let url = this.router.url;
        if (url.includes("management") || url.includes("alerts") || url.includes("previous-earnings-effects") || url.includes("previous-dividend-effects") || url.includes("earnings-analysis") || url.includes("other-predictions-from-websites"))
        this.broadcastingService.emitSymbol(symbol);
        else
          this.router.navigate(["stock/overview/" + symbol.ticker]);
        this.searchTextEmpty.emit(true);
      }
    }
  }

  onClick(symbol) {
    if (symbol) {
      this._observableList.next(null);
      this.control.setValue("");
      this.searchOpenClass = '';
      let url = this.router.url;
      if (url.includes("management") || url.includes("alerts") || url.includes("previous-earnings-effects") || url.includes("previous-dividend-effects") || url.includes("earnings-analysis") || url.includes("other-predictions-from-websites"))
        this.broadcastingService.emitSymbol(symbol);
      else
        this.router.navigate(["stock/overview/" + symbol.ticker]);
      this.searchTextEmpty.emit(true);
    }
  }


  ChangeLanguage(language) {
    this.translate.use(language.key);

    this.selectedLanguageText = language.name;
    this.selectedLanguageFlag = language.flagUrl;
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleSearchOpenClass(display) {
    console.log('disp', display);
    this.control.setValue("");
    if (display) {
      this.searchOpenClass = 'open';
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
    }
    else {
      this.searchOpenClass = '';
    }
    this.searchTextEmpty.emit(true);
    this.cdr.detectChanges();
  }



  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }

  showAlertModal() {
    this.modalList.open();
  }
  navigateToAlerts() {
    this.router.navigate(['/stock/alerts']);
  }
  navigateToWatchlist() {
    this.router.navigate(['/stock/wishlist']);
  }
}
