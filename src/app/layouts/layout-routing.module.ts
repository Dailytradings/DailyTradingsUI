import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsDetailPageComponent } from 'app/pages/full-pages/news-detail-page/news-detail-page.component';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { AlertComponent } from './alert/alert.component';
import { AnalystRatingsPageComponent } from './analyst-ratings-page/analyst-ratings-page.component';
import { DividendPageComponent } from './dividend-page/dividend-page.component';
import { DividendsComponent } from './dividends/dividends.component';
import { EarningsAnalysisComponent } from './earnings-analysis/earnings-analysis.component';
import { EarningsPageComponent } from './earnings-page/earnings-page.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HotStockOpportunitiesComponent } from './hot-stock-opportunities/hot-stock-opportunities.component';
import { InsiderTradesPageComponent } from './insider-trades-page/insider-trades-page.component';
import { InsiderTradesComponent } from './insider-trades/insider-trades.component';
import { MostReliableCompetitorsComponent } from './most-reliable-competitors/most-reliable-competitors.component';
import { ObservableOpportunitieseComponent } from './observable-opportunities/observable-opportunities.component';
import { OtherPredictionsFromWebsitesComponent } from './other-predictions-from-websites/other-predictions-from-websites.component';
import { OverviewComponent } from './overview/overview.component';
import { PremarketAnalysisComponent } from './premarket-analysis/premarket-analysis.component';
import { PreviousDividendEffectsComponent } from './previous-dividend-effects/previous-dividend-effects.component';
import { PreviousEarningsEffectsComponent } from './previous-earnings-effects/previous-earnings-effects.component';
import { RatingsComponent } from './ratings/ratings.component';
import { WishlistOverviewComponent } from './wishlist-overview/wishlist-overview.component';




const routes: Routes = [
    {
        path: 'home',
        component: HomepageComponent,
        data: {
            title: 'Home'
        }
    },
    {
        path: '',
        children: [
            {
                path: 'wishlist',
                component: WishlistOverviewComponent,
                data: {
                    title: 'Wish List'
                }
            },
            {
                path: 'earnings-opportunities',
                component: HotStockOpportunitiesComponent,
                data: {
                    title: 'Earnings Opportunities'
                }
            },
            {
                path: 'earnings-page',
                component: EarningsPageComponent,
                data: {
                    title: 'Earnings Page'
                }
            },
            {
                path: 'realtime-opportunities',
                component: ObservableOpportunitieseComponent,
                data: {
                    title: 'Realtime Opportunities'
                }
            },
            {
                path: 'insider-trades',
                component: InsiderTradesComponent,
                data: {
                    title: 'Insider Trades'
                }
            },
            {
                path: 'insider-trades-page',
                component: InsiderTradesPageComponent,
                data: {
                    title: 'Insider Trades Page'
                }
            },
            {
                path: 'premarket-analysis',
                component: PremarketAnalysisComponent,
                data: {
                    title: 'Premarket Analysis'
                }
            },
            {
                path: 'overview/:id',
                redirectTo: 'overview/:id/opportunities',
                pathMatch: 'full'
            },
            {
                path: 'overview/:id/:id2',
                component: OverviewComponent,
                data: {
                    title: 'Overview'
                }
            },
            {
                path: 'alerts',
                component: AlertComponent,
                data: {
                    title: 'Alerts'
                }
            },
            {
                path: 'dividends',
                component: DividendsComponent,
                data: {
                    title: 'Dividends'
                }
            },
            {
                path: 'dividend-page',
                component: DividendPageComponent,
                data: {
                    title: 'Dividend Page'
                }
            },
            {
                path: 'ratings',
                component: RatingsComponent,
                data: {
                    title: 'Analyst Ratings'
                }
            },
            {
                path: 'analyst-ratings-page',
                component: AnalystRatingsPageComponent,
                data: {
                    title: 'Analyst Ratings Page'
                }
            },
            {
                path: 'other-predictions-from-websites',
                component: OtherPredictionsFromWebsitesComponent,
                data: {
                    title: 'Other Predictions From Websites'
                }
            },
            {
                path: 'other-predictions-from-websites/:id',
                component: OtherPredictionsFromWebsitesComponent,
                data: {
                    title: 'Other Predictions From Websites'
                }
            },
            {
                path: 'earnings-analysis',
                component: EarningsAnalysisComponent,
                data: {
                    title: 'Earnings Analysis via Stocks\' Peers'
                }
            },
            {
                path: 'earnings-analysis/:id',
                component: EarningsAnalysisComponent,
                data: {
                    title: 'Earnings Analysis via Stocks\' Peers'
                }
            },
            {
                path: 'previous-earnings-effects',
                component: PreviousEarningsEffectsComponent,
                data: {
                    title: 'Previous Earnings Effects'
                }
            },
            {
                path: 'previous-earnings-effects/:id',
                component: PreviousEarningsEffectsComponent,
                data: {
                    title: 'Previous Earnings Effects'
                }
            },
            {
                path: 'previous-dividend-effects',
                component: PreviousDividendEffectsComponent,
                data: {
                    title: 'Previous Dividend Effects'
                }
            },
            {
                path: 'previous-dividend-effects/:id',
                component: PreviousDividendEffectsComponent,
                data: {
                    title: 'Previous Dividend Effects'
                }
            },
            {
                path: 'most-reliable-competitors',
                component: MostReliableCompetitorsComponent,
                data: {
                    title: 'Most Reliable Competitors'
                }
            },
            {
                path: 'all-news',
                component: NewsDetailPageComponent,
                data: {
                    title: 'Most Reliable Competitors'
                }
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LayoutRoutingModule { }
