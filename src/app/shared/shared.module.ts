import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { ClickOutsideModule } from 'ng-click-outside';

import { AutocompleteModule } from './components/autocomplete/autocomplete.module';
import { PipeModule } from './pipes/pipe.module';

//COMPONENTS
import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { VerticalMenuComponent } from "./vertical-menu/vertical-menu.component";
import { CustomizerComponent } from './customizer/customizer.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';

//DIRECTIVES
import { ToggleFullscreenDirective } from "./directives/toggle-fullscreen.directive";
import { SidebarLinkDirective } from './directives/sidebar-link.directive';
import { SidebarDropdownDirective } from './directives/sidebar-dropdown.directive';
import { SidebarAnchorToggleDirective } from './directives/sidebar-anchor-toggle.directive';
import { SidebarDirective } from './directives/sidebar.directive';
import { TopMenuDirective } from './directives/topmenu.directive';
import { TopMenuLinkDirective } from './directives/topmenu-link.directive';
import { TopMenuDropdownDirective } from './directives/topmenu-dropdown.directive';
import { TopMenuAnchorToggleDirective } from './directives/topmenu-anchor-toggle.directive';
import { DynamicTableComponent } from './table/table.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertListModalComponent } from 'app/layouts/alert/alert-list-modal/alert-list-modal.component';
import { AlertModalComponent } from 'app/layouts/alert/alert-modal/alert-modal.component';
import { AlertComponent } from 'app/layouts/alert/alert.component';
import { DataTablesRoutingModule } from 'app/Template/data-tables/data-tables-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AdPanelComponent } from './ad-panel/ad-panel.component';
import { NewsPanelComponent } from './news-panel/news-panel.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartsModule } from 'ng2-charts';
import { UserBlockComponent } from './navbar/user-block/user-block.component';
import { HomepageNewsPanelComponent } from './news-panel/homepage-news-panel/homepage-news-panel.component';
import { ChartistModule } from 'ng-chartist';

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
        DataTablesRoutingModule,
        NgxDatatableModule,
        AdPanelComponent,
        NewsPanelComponent,
        HomepageNewsPanelComponent,
        NgxChartsModule,
        ChartsModule,
        ChartistModule,
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
        DataTablesRoutingModule,
        NgxDatatableModule,
        NgxChartsModule,
        ChartsModule,
        ChartistModule,
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
        HomepageNewsPanelComponent
    ],
    providers: [DecimalPipe]
})
export class SharedModule { }
