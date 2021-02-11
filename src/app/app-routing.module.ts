import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layouts/content/content-layout.component';
import { FullLayoutComponent } from './layouts/full/full-layout.component';
import { HomepageComponent } from './layouts/homepage/homepage.component';
import { CONTENT_ROUTES } from "./shared/routes/content-layout.routes";
import { Full_ROUTES } from "./shared/routes/full-layout.routes";




const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'stock/home',
    pathMatch: 'full',
  },
  {path: 'home', component: HomepageComponent},
  { path: '', component: FullLayoutComponent, data: { title: 'full Views' }, children: Full_ROUTES },
  { path: '', component: ContentLayoutComponent, data: { title: 'content Views' }, children: CONTENT_ROUTES },
  {
    path: '**',
    redirectTo: 'pages/error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    initialNavigation: 'enabled',
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
