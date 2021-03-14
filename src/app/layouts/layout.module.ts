import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { createTranslateLoader } from 'app/app.module';
import { HorizontalTimelineComponent } from 'app/pages/full-pages/timeline/horizontal/component/horizontal-timeline.component';
import { HorizontalTimelinePageComponent } from 'app/pages/full-pages/timeline/horizontal/horizontal-timeline-page.component';
import { SharedModule } from 'app/shared/shared.module';
import { PipeModule } from './../shared/pipes/pipe.module';
import { AlertModalComponent } from './alert/alert-modal/alert-modal.component';
import { AlertComponent } from './alert/alert.component';
import { AnalystRatingsOpportunitiesListComponent } from './analyst-ratings-page/analyst-ratings-opportunities-list/analyst-ratings-opportunities-list.component';
import { AnalystRatingsPageComponent } from './analyst-ratings-page/analyst-ratings-page.component';
import { DividendOpportunitiesListComponent } from './dividend-page/dividend-opportunities-list/dividend-opportunities-list.component';
import { DividendPageComponent } from './dividend-page/dividend-page.component';
import { DividendsComponent } from './dividends/dividends.component';
import { EarningsAnalysisComponent } from './earnings-analysis/earnings-analysis.component';
import { EarningsOpportunitiesListComponent } from './earnings-page/earnings-opportunities-list/earnings-opportunities-list.component';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { UpcomingEarningsComponent } from './homepage/upcoming-earnings/upcoming-earnings.component';
import { HotStockOpportunitiesComponent } from './hot-stock-opportunities/hot-stock-opportunities.component';
import { RealtimeTableComponent } from './hot-stock-opportunities/realtime-table/realtime-table.component';
import { InsiderTradesOpportunitiesListComponent } from './insider-trades-page/insider-trades-opportunities-list/insider-trades-opportunities-list.component';
import { InsiderTradesPageComponent } from './insider-trades-page/insider-trades-page.component';
import { InsiderTradesComponent } from './insider-trades/insider-trades.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { MostReliableCompetitorsComponent } from './most-reliable-competitors/most-reliable-competitors.component';
import { ObservableOpportunitieseComponent } from './observable-opportunities/observable-opportunities.component';
import { OtherPredictionsFromWebsitesComponent } from './other-predictions-from-websites/other-predictions-from-websites.component';
import { CompetitorListComponent } from './overview/competitor-list/competitor-list.component';
import { OpportunitiesListComponent } from './overview/opportunities-list/opportunities-list.component';
import { OverviewComponent } from './overview/overview.component';
import { PremarketAnalysisComponent } from './premarket-analysis/premarket-analysis.component';
import { PreviousDividendEffectsComponent } from './previous-dividend-effects/previous-dividend-effects.component';
import { PreviousEarningsEffectsComponent } from './previous-earnings-effects/previous-earnings-effects.component';
import { RatingsComponent } from './ratings/ratings.component';
import { OverviewPanelComponent } from './widgets/overview-panel/overview-panel.component';
import { WishlistOverviewPanelComponent } from './widgets/wishlist-overview-panel/wishlist-overview-panel.component';
import { AlertListComponent } from './wishlist-overview/alert-list/alert-list.component';
import { WatchlistComponent } from './wishlist-overview/watchlist/watchlist.component';
import { PreviousEarningsEffectsListComponent } from './previous-earnings-effects/previous-earnings-effects-list/previous-earnings-effects-list.component';
import { PreviousDividendEffectsListComponent } from './previous-dividend-effects/previous-dividend-effects-list/previous-dividend-effects-list.component';
import { EarningsAnalysisListComponent } from './earnings-analysis/earnings-analysis-list/earnings-analysis-list.component';
import { OtherPredictionsFromWebsitesListComponent } from './other-predictions-from-websites/other-predictions-from-websites-list/other-predictions-from-websites-list.component';
import { LockedPanelComponent } from './widgets/locked-panel/locked-panel.component';
import { WatchlistOverviewComponent } from './watchlist-overview/watchlist-overview.component';
import { WatchlistOpportunitiesListComponent } from './watchlist-overview/watchlist-opportunities-list/watchlist-opportunities-list.component';



@NgModule({
  exports: [
    WatchlistOpportunitiesListComponent,
    AlertListComponent
  ],
  declarations: [
    HotStockOpportunitiesComponent, 
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
    OpportunitiesListComponent, 
    WishlistOverviewPanelComponent, 
    AlertListComponent,
    EarningsOpportunitiesListComponent,
    UpcomingEarningsComponent,
    DividendOpportunitiesListComponent,
    InsiderTradesOpportunitiesListComponent,
    AnalystRatingsOpportunitiesListComponent,
    HorizontalTimelinePageComponent,
    HorizontalTimelineComponent,
    PreviousEarningsEffectsListComponent,
    PreviousDividendEffectsListComponent,
    EarningsAnalysisListComponent,
    OtherPredictionsFromWebsitesListComponent,
    LockedPanelComponent,
    WatchlistOverviewComponent,
    WatchlistOpportunitiesListComponent,
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
