import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy } from '@angular/core';
import { HROUTES } from './navigation-routes.config';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BroadcastingService } from '../services/broadcasting.service';


@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss']
})
export class HorizontalMenuComponent implements OnInit, AfterViewInit, OnDestroy {

  allowedToSee;

  public menuItems: any[];
  public config: any = {};
  level: number = 0;
  transparentBGClass = "";
  menuPosition = 'Side';

  layoutSub: Subscription;

  constructor(private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private authService: AuthService,
    private broadcastingService: BroadcastingService) {
    this.config = this.configService.templateConf;
    
    
    broadcastingService.logInObservable.subscribe(() => {
      this.checkDataVisibilityPermission();
    });
    broadcastingService.logOutObservable.subscribe(() => {
      this.checkDataVisibilityPermission();
    });
  }

  ngOnInit() {
    this.checkDataVisibilityPermission();

  }

  checkDataVisibilityPermission() {
    this.allowedToSee = this.authService.isAuthenticated("Management");
    let menu = HROUTES
    menu.forEach(element => {
      if(element.title === 'Management' && !this.allowedToSee) {
        element.class += ' hidden-menu';
      } else if(element.title === 'Management' && this.allowedToSee){
        element.class = element.class.replace('hidden-menu', '');
      }
    });
    this.menuItems = menu;
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {

    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }


    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }

  redirectToRoute(path) {
    this.router.navigate([path]);
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

}
