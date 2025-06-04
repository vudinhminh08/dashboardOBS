import { Routes, RouterModule } from '@angular/router';
import { UserManagerComponent } from '@modules/user-role/user-manager/pages/user-manager.component';
import { NewsManagerListComponent } from '@modules/news-manager/pages/news-manager-list/news-manager-list.component';
import { CreateNewsComponent } from '@modules/news-manager/pages/create-news/create-news.component';
import {
  NewsManagerDetailComponent
} from '@modules/news-manager/pages/news-manager-detail/news-manager-detail.component';
import { RoleUser } from '@core/enums';
import { PermissionService } from '@core/services/permission.service';
import {
  NewsManagerDetailOnlyViewComponent
} from '@modules/news-manager/pages/news-manager-detail-only-view/news-manager-detail-only-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  {
    path: 'list',
    component: NewsManagerListComponent,
    data: {
      // icon: 'tag-user',
      title: 'Danh sách',
      breadcrumb: 'Danh sách',
    }
  },
  {
    path: 'create',
    component: CreateNewsComponent,
    data: {
      // icon: 'tag-user',
      title: 'Tạo mới',
      breadcrumb: 'Tạo mới',
      permissions: {
        allow: [RoleUser.ADMIN, RoleUser.USER],
      }
    },
    canActivate: [PermissionService]
  },
  {
    path: 'detail/:articleId',
    component: NewsManagerDetailComponent,
    data: {
      // icon: 'tag-user',
      title: 'Cập nhật tin tức',
      breadcrumb: 'Cập nhật tin tức',
    }
  },
  {
    path: 'view/:articleId',
    component: NewsManagerDetailOnlyViewComponent,
    data: {
      // icon: 'tag-user',
      title: 'Xem chi tiết bài viết',
      breadcrumb: 'Xem chi tiết bài viết',
    }
  },
];

export const NewsManagerRouting = RouterModule.forChild(routes);
