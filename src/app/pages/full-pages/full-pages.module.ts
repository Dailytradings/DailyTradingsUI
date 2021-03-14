import { AgmCoreModule } from "@agm/core";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { PipeModule } from "app/shared/pipes/pipe.module";
import { ChartistModule } from "ng-chartist";
import { SwiperModule } from "ngx-swiper-wrapper";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { FaqComponent } from "./faq/faq.component";
import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { SearchComponent } from "./search/search.component";
import { TimelineVerticalCenterPageComponent } from "./timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component";
import { TimelineVerticalLeftPageComponent } from "./timeline/vertical/timeline-vertical-left-page/timeline-vertical-left-page.component";
import { TimelineVerticalRightPageComponent } from "./timeline/vertical/timeline-vertical-right-page/timeline-vertical-right-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UsersViewComponent } from "./users/users-view/users-view.component";
import { CreditCardAddComponent } from './user-profile/credit-card-add/credit-card-add.component';
import { ProfileUpdateComponent } from './user-profile/profile-update/profile-update.component';
import { CreditCardUpdateComponent } from './user-profile/credit-card-update/credit-card-update.component';
import { LayoutModule } from "app/layouts/layout.module";
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { CopyrightComponent } from './copyright/copyright.component';
import { WhyUsComponent } from './why-us/why-us.component';


@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgSelectModule,
    NgbModule,
    SwiperModule,
    PipeModule,
    NgxDatatableModule,
    LayoutModule
  ],
  declarations: [
    GalleryPageComponent,
    InvoicePageComponent,
    TimelineVerticalCenterPageComponent,
    TimelineVerticalLeftPageComponent,
    TimelineVerticalRightPageComponent,
    UserProfilePageComponent,
    SearchComponent,
    FaqComponent,
    AccountSettingsComponent,
    UsersListComponent,
    UsersViewComponent,
    UsersEditComponent,
    CreditCardAddComponent,
    ProfileUpdateComponent,
    CreditCardUpdateComponent,
    AboutUsComponent,
    ContactUsComponent,
    CopyrightComponent,
    WhyUsComponent
  ]
})
export class FullPagesModule {}
