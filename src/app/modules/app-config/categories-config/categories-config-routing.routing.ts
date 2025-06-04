import { Routes, RouterModule } from '@angular/router';
import { CategoriesConfigComponent } from '@modules/app-config/categories-config/pages/categories-config.component';

const routes: Routes = [
  {
    path: 'list',
    component: CategoriesConfigComponent,
    data: {
      title: 'Danh sách',
      breadcrumb: 'Danh sách',
    }
  },
];

export const CategoriesConfigRouting = RouterModule.forChild(routes);
