import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: () => import('@modules/app-config/categories-config/categories-config.module').then((m) => m.CategoriesConfigModule),
    data: {
      title: 'Danh sách danh mục',
      breadcrumb: 'Danh sách danh mục',
    }
  },
];

export const AppConfigRouting = RouterModule.forChild(routes);
