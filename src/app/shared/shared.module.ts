import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule, DecimalPipe } from "@angular/common";
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AlertListModalComponent } from 'app/layouts/alert/alert-list-modal/alert-list-modal.component';
import { ClickOutsideModule } from 'ng-click-outside';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { UiSwitchModule } from 'ngx-ui-switch';
import { AdPanelComponent } from './ad-panel/ad-panel.component';
import { AutocompleteModule } from './components/autocomplete/autocomplete.module';
import { CustomizerComponent } from './customizer/customizer.component';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDirective } from './directives/sidebar.directive';
//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { TopMenuAnchorToggleDirective } from './directives/topmenu-anchor-toggle.directive';
import { TopMenuDropdownDirective } from './directives/topmenu-dropdown.directive';
import { TopMenuLinkDirective } from './directives/topmenu-link.directive';
import { TopMenuDirective } from './directives/topmenu.directive';
//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { NavbarComponent } from "./navbar/navbar.component";
import { UserBlockComponent } from './navbar/user-block/user-block.component';
import { HomepageNewsPanelComponent } from './news-panel/homepage-news-panel/homepage-news-panel.component';
import { ChartistModule } from 'ng-chartist';
import { NewsPanelComponent } from './news-panel/news-panel.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { PipeModule } from './pipes/pipe.module';
import { DynamicTableComponent } from './table/table.component';
import { VerticalMenuComponent } from "./vertical-menu/vertical-menu.component";
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NewsDetailComponent } from './news-detail/news-detail.component';
import { PrideCornerNewsPanelComponent } from './news-panel/pride-corner-news-panel/pride-corner-news-panel.component';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarDirective,
        TopMenuDirective,
        NgbModule,
        TranslateModule,
        DynamicTableComponent,
        DecimalPipe,
        UiSwitchModule,
        NgxDatatableModule,
        AdPanelComponent,
        NewsPanelComponent,
        HomepageNewsPanelComponent,
        NgxChartsModule,
        ChartsModule,
        ChartistModule,
        SwiperModule,
        NewsDetailComponent,
        PrideCornerNewsPanelComponent
    ],
    imports: [
        RouterModule,
        FormsModule,
        CommonModule,
        NgbModule,
        TranslateModule,
        FormsModule,
        OverlayModule,
        ReactiveFormsModule ,
        PerfectScrollbarModule,
        ClickOutsideModule,
        AutocompleteModule,
        PipeModule,
        UiSwitchModule,
        NgxDatatableModule,
        NgxChartsModule,
        ChartsModule,
        ChartistModule,
        SwiperModule
        ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        VerticalMenuComponent,
        HorizontalMenuComponent,
        CustomizerComponent,
        NotificationSidebarComponent,
        ToggleFullscreenDirective,
        SidebarLinkDirective,
        SidebarDropdownDirective,
        SidebarAnchorToggleDirective,
        SidebarDirective,
        TopMenuLinkDirective,
        TopMenuDropdownDirective,
        TopMenuAnchorToggleDirective,
        TopMenuDirective,
        DynamicTableComponent,
        AlertListModalComponent,
        AdPanelComponent,
        NewsPanelComponent,
        UserBlockComponent,
        HomepageNewsPanelComponent,
        NewsDetailComponent,
        PrideCornerNewsPanelComponent
    ],
    providers: [DecimalPipe]
})
export class SharedModule { }
