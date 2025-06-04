import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
      path: 'config-field',
      loadChildren: () =>
        import(
          '@modules/service-configuration/config-field/config-field.module'
        ).then((m) => m.ConfigFeildModule),
      data: {
        title: 'Cấu hình lĩnh vực',
        breadcrumb: 'Cấu hình lĩnh vực',
      }
    },

    {
      path: 'service-config',
      loadChildren: () =>
        import(
          '@modules/service-configuration/service-config/service-config.module'
        ).then((m) => m.ServiceConfigModule),
      data: {
        title: 'Cấu hình dịch vụ',
        breadcrumb: 'Cấu hình dịch vụ',
      }
    },
    {
      path: 'product-configuration',
      loadChildren: () =>
        import(
          '@modules/service-configuration/product-configuration/product-configuration.module'
        ).then((m) => m.ProductConfigurationModule),
      data: {
        title: 'Cấu hình sản phẩm',
        breadcrumb: 'Cấu hình sản phẩm',
      }
    }
]

export const ServiceConfigurationRoute = RouterModule.forChild(routes);