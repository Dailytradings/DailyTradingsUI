import { Component, ViewChild, OnInit, OnDestroy, Inject, Renderer2, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';
import { SymbolService } from 'app/shared/services/symbol.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ContentService } from 'app/shared/services/content.service';
import { BroadcastingService } from 'app/shared/services/broadcasting.service';
import { AuthService } from 'app/shared/auth/auth.service';


@Component({
    selector: 'app-user-profile-page',
    templateUrl: './user-profile-page.component.html',
    styleUrls: ['./user-profile-page.component.scss']
})

export class UserProfilePageComponent implements OnInit, AfterViewInit, OnDestroy {
  public config: any = {};
  layoutSub: Subscription;

 
  symbol: any;


  constructor(private configService: ConfigService,
    private layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private symbolService: SymbolService,
    private contentService: ContentService,
    private broadcastingService: BroadcastingService,
    private authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2, private cdr: ChangeDetectorRef
  ) {
    this.config = this.configService.templateConf;
  }

    selectedEdit;
   
    selectEdit(edit) {
      this.selectedEdit = edit;
    }

    selectedEditTitle;
    selectEditTitle(editTitle){
      this.selectedEditTitle = editTitle;
    }
    ngOnInit(): void {
      this.broadcastingService.creditCard.subscribe((val) => {
        this.selectEdit(val);
      });
  
      this.selectedEdit = "profile-update";
      this.selectedEditTitle = "side-observings";
      this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.cdr.markForCheck();
      })
    }

    ngAfterViewInit() {
      let conf = this.config;
      conf.layout.sidebar.collapsed = true;
      this.configService.applyTemplateConfigChange({ layout: conf.layout });
    }

    ngOnDestroy() {
      let conf = this.config;
      conf.layout.sidebar.collapsed = false;
      this.configService.applyTemplateConfigChange({ layout: conf.layout });
      if (this.layoutSub) {
        this.layoutSub.unsubscribe();
      }
    }

}
