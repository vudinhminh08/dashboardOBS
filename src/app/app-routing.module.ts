import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from '@layout/auth-layout/auth-layout.component';
import { ContentLayoutComponent } from '@layout/content-layout/content-layout.component';
import { AuthGuard } from '@core/guards';
import { LoginAuthGuard } from '@core/guards/login-auth.guard';
import { PermissionService } from '@core/services/permission.service';
import { RoleUser } from '@core/enums';

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('@modules/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },

      {
        path: 'user-role',
        loadChildren: () => import('@modules/user-role/user-role.module').then((m) => m.UserRoleModule),
        data: {
          title: 'Người dùng và quyền',
          breadcrumb: 'Người dùng và quyền',
          permissions: {
            allow: [RoleUser.ADMIN],
          }
        },
        canActivate: [PermissionService]
      },
      {
        path: 'categories-config',
        loadChildren: () => import('@modules/app-config/app-config.module').then((m) => m.AppConfigModule),
        data: {
          title: 'Cấu hình danh mục',
          breadcrumb: 'Cấu hình danh mục',
        }
      },
 
      {
        path: 'service-configuration',
        loadChildren: () => import('./modules/service-configuration/service-configuration.module').then((m) => m.ServiceConfigurationModule),
        data: {
          breadcrumb: 'Cấu hình dịch vụ'
        }
      },
      {
        path: 'main-service-configuration',
        loadChildren: () => import('./modules/main-service-configuration/main-service-configuration.module').then((m) => m.MainServiceConfigurationModule),
        data: {
          breadcrumb: 'Cấu hình dịch vụ chính'
        }
      },
      {
        path: 'video-configuration',
        loadChildren: () => import('./modules/video-configuration/video-configuration.module').then((m) => m.VideoConfigurationModule),
        data: {
          breadcrumb: 'Cấu hình video'
        }
      },
      {
        path: 'news-manager',
        loadChildren: () => import('./modules/news-manager/news-manager.module').then((m) => m.NewsManagerModule),
        data: {
          breadcrumb: 'Quản lý tin tức'
        }
      },
      {
        path: 'banner-config',
        loadChildren: () => import('./modules/banner-config/banner-config.module').then((m) => m.BannerConfigModule),
        data: {
          breadcrumb: 'Cấu hình banner'
        }
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('@modules/auth/auth.module').then((m) => m.AuthModule),
    // canActivate: [LoginAuthGuard],
  },

];


export const AppRoutes = RouterModule.forRoot(routes, {
  paramsInheritanceStrategy: 'always'
});
