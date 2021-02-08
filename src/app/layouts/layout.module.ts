import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { PipeModule } from './../shared/pipes/pipe.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { HotStockOpportunitiesComponent } from './hot-stock-opportunities/hot-stock-opportunities.component';
import { DataTablesRoutingModule } from '../Template/data-tables/data-tables-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'app/app.module';
import { HttpClient } from '@angular/common/http';
import { DataTablesComponent } from 'app/Template/data-tables/data-tables.component';
import { SharedModule } from 'app/shared/shared.module';
import { RealtimeTableComponent } from './hot-stock-opportunities/realtime-table/realtime-table.component';
import { ObservableOpportunitieseComponent } from './observable-opportunities/observable-opportunities.component';
import { InsiderTradesComponent } from './insider-trades/insider-trades.component';
import { PremarketAnalysisComponent } from './premarket-analysis/premarket-analysis.component';
import { OverviewComponent } from './overview/overview.component';
import { HomepageComponent } from './homepage/homepage.component';
import { WatchlistComponent } from './wishlist-overview/watchlist/watchlist.component';
import { AlertComponent } from './alert/alert.component';
import { AlertModalComponent } from './alert/alert-modal/alert-modal.component';
import { DividendsComponent } from './dividends/dividends.component';
import { RatingsComponent } from './ratings/ratings.component';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';
import { DividendPageComponent } from './dividend-page/dividend-page.component';
import { AnalystRatingsPageComponent } from './analyst-ratings-page/analyst-ratings-page.component';
import { InsiderTradesPageComponent } from './insider-trades-page/insider-trades-page.component';
import { PreviousEarningsEffectsComponent } from './previous-earnings-effects/previous-earnings-effects.component';
import { PreviousDividendEffectsComponent } from './previous-dividend-effects/previous-dividend-effects.component';
import { MostReliableCompetitorsComponent } from './most-reliable-competitors/most-reliable-competitors.component';
import { EarningsAnalysisComponent } from './earnings-analysis/earnings-analysis.component';
import { OtherPredictionsFromWebsitesComponent } from './other-predictions-from-websites/other-predictions-from-websites.component';
import { OverviewPanelComponent } from './widgets/overview-panel/overview-panel.component';
import { CompetitorListComponent } from './overview/competitor-list/competitor-list.component';
import { DividendListComponent } from './overview/dividend-list/dividend-list.component';
import { EarningsListComponent } from './overview/earnings-list/earnings-list.component';
import { OpportunitiesListComponent } from './overview/opportunities-list/opportunities-list.component';
import { WishlistOverviewComponent } from './wishlist-overview/wishlist-overview.component';
import { AlertListComponent } from './wishlist-overview/alert-list/alert-list.component';
import { WishlistOverviewPanelComponent } from './widgets/wishlist-overview-panel/wishlist-overview-panel.component';
import { WishlistOpportunitiesListComponent } from './wishlist-overview/wishlist-opportunities-list/wishlist-opportunities-list.component';
import { EarningsOpportunitiesListComponent } from './earnings-page/earnings-opportunities-list/earnings-opportunities-list.component';
import { UpcomingEarningsComponent } from './homepage/upcoming-earnings/upcoming-earnings.component';
import { DividendOpportunitiesListComponent } from './dividend-page/dividend-opportunities-list/dividend-opportunities-list.component';
import { InsiderTradesOpportunitiesListComponent } from './insider-trades-page/insider-trades-opportunities-list/insider-trades-opportunities-list.component';
import { AnalystRatingsOpportunitiesListComponent } from './analyst-ratings-page/analyst-ratings-opportunities-list/analyst-ratings-opportunities-list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HorizontalTimelinePageComponent } from 'app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component';
import { HorizontalTimelineComponent } from 'app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component';


@NgModule({
  declarations: [
    HotStockOpportunitiesComponent, 
    DataTablesComponent, 
    RealtimeTableComponent, 
    ObservableOpportunitieseComponent, 
    InsiderTradesComponent, 
    PremarketAnalysisComponent, 
    OverviewComponent, 
    HomepageComponent,
     WatchlistComponent,
    AlertComponent, 
    AlertModalComponent, 
    DividendsComponent, 
    RatingsComponent,
    EarningsPageComponent, 
    DividendPageComponent, 
    AnalystRatingsPageComponent, 
    InsiderTradesPageComponent, 
    PreviousEarningsEffectsComponent, 
    PreviousDividendEffectsComponent, 
    MostReliableCompetitorsComponent, 
    EarningsAnalysisComponent, 
    OtherPredictionsFromWebsitesComponent, 
    OverviewPanelComponent, 
    CompetitorListComponent, 
    DividendListComponent, 
    EarningsListComponent, 
    OpportunitiesListComponent, 
    WishlistOverviewComponent, 
    WishlistOverviewPanelComponent, 
    AlertListComponent,
    WishlistOpportunitiesListComponent,
    EarningsOpportunitiesListComponent,
    UpcomingEarningsComponent,
    DividendOpportunitiesListComponent,
    InsiderTradesOpportunitiesListComponent,
    AnalystRatingsOpportunitiesListComponent,
    HorizontalTimelinePageComponent,
    HorizontalTimelineComponent,
  ],
  imports: [
    CommonModule,
    NgxChartsModule,
    LayoutRoutingModule,
    PipeModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),  
  ]
})
export class LayoutModule { }
