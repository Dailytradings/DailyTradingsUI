import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { CompanyComponent } from './company/company.component';
import { CompetitorsManagementComponent } from './company/competitors-management/competitors-management.component';
import { DividendManagementComponent } from './company/dividend-management/dividend-management.component';
import { EarningsManagementComponent } from './company/earnings-management/earnings-management.component';
import { OldCompanyComponent } from './company/old-company/old-company.component';
import { OtherPredictionsManagementComponent } from './company/other-predictions-management/other-predictions-management.component';
import { GeneralComponent } from './general/general.component';
import { HolidaysManagementComponent } from './general/holidays-management/holidays-management.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'company',
                component: CompanyComponent,
                data: {
                    title: 'Company'
                }
            },
            {
                path: 'company/:id',
                component: CompanyComponent,
                data: {
                    title: 'Company'
                }
            },
            {
                path: 'general',
                component: GeneralComponent,
                data: {
                    title: 'General'
                }
            },
            {
                path: 'holiday-management',
                component: HolidaysManagementComponent,
                data: {
                    title: 'Holidays Management'
                }
            },
            {
                path: 'oldcompany',
                component: OldCompanyComponent,
                data: {
                    title: 'Old Company'
                }
            },
            {
                path: 'oldcompany/:id',
                component: OldCompanyComponent,
                data: {
                    title: 'Company'
                }
            },
            {
                path: 'user',
                component: UserComponent,
                data: {
                    title: 'User'
                }
            },
            {
                path: 'earnings-management/:id',
                component: EarningsManagementComponent,
                data: {
                    title: 'Earnings Management'
                }
            },
            {
                path: 'dividend-management/:id',
                component: DividendManagementComponent,
                data: {
                    title: 'Dividend Management'
                }
            },
            {
                path: 'other-predictions-management/:id',
                component: OtherPredictionsManagementComponent,
                data: {
                    title: 'Other Predictions Management'
                }
            },
            {
                path: 'competitors-management/:id',
                component: CompetitorsManagementComponent,
                data: {
                    title: 'Competitors Management'
                }
            }
        ], canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ManagementRoutingModule { }
