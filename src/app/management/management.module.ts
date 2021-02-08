import { NgModule } from '@angular/core';

import { ManagementRoutingModule } from './management-routing.module';
import { AngularResizedEventModule } from 'angular-resize-event';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { SymbolComponent } from './company/symbol/symbol.component';
import { EarningsComponent } from './company/earnings/earnings.component';
import { KeystatsComponent } from './company/keystats/keystats.component';
import { IncomeComponent } from './company/income/income.component';
import { CompetitorsComponent } from './company/competitors/competitors.component';
import { CompanyComponent } from './company/company.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';
import { EarningsTableComponent } from './company/earnings/earnings-table/table.earnings-component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DividendComponent } from './company/dividend/dividend.component';
import { DividendTableComponent } from './company/dividend/dividend-table/dividend-table.component';
import { OtherPredictionsComponent } from './company/earnings/other-predictions/other-predictions.component';
import { PredictionModalComponent } from './company/earnings/other-predictions/prediction-modal/prediction-modal.component';
import { CompetitorComparisonComponent } from './company/competitor-comparison/competitor-comparison.component';
import { HistoricalAnalysisComponent } from './company/earnings/historical-analysis/historical-analysis.component';
import { UserComponent } from './user/user.component';
import { EarningsManagementComponent } from './company/earnings-management/earnings-management.component';
import { DividendManagementComponent } from './company/dividend-management/dividend-management.component';
import { OtherPredictionsManagementComponent } from './company/other-predictions-management/other-predictions-management.component';
import { CompetitorsManagementComponent } from './company/competitors-management/competitors-management.component';
import { OldCompanyComponent } from './company/old-company/old-company.component';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ManagementRoutingModule,
        MatchHeightModule,
        AngularResizedEventModule,
        SharedModule,
        NgSelectModule
    ],
    exports: [],
    declarations: [
        SymbolComponent,
        EarningsComponent,
        KeystatsComponent,
        IncomeComponent,
        CompanyComponent,
        EarningsTableComponent,
        CompetitorsComponent,
        DividendComponent,
        DividendTableComponent,
        OtherPredictionsComponent,
        PredictionModalComponent,
        CompetitorComparisonComponent,
        HistoricalAnalysisComponent,
        UserComponent,
        EarningsManagementComponent,
        DividendManagementComponent,
        OtherPredictionsManagementComponent,
        CompetitorsManagementComponent,
        OldCompanyComponent
    ],
    providers: [ ],
})
export class ManagementModule { }
