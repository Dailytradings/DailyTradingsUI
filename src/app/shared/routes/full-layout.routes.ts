import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
  {
    path: 'management',
    loadChildren: () => import('../../management/management.module').then(m => m.ManagementModule)
  },
  {
    path: 'stock',
    loadChildren: () => import('../../layouts/layout.module').then(m => m.LayoutModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)
  }
];
