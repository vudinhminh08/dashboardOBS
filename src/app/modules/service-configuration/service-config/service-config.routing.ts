import { RouterModule, Routes } from "@angular/router";
import { ServiceConfigComponent } from "./pages/service-config/service-config.component";
import { ServiceConfigCreateComponent } from "./pages/service-config/service-config-create/service-config-create.component";
import { ServiceConfigUpdateFormComponent } from "./components/service-config-update-form/service-config-update-form.component";

const routes: Routes = [
    {
      path: '',
      component: ServiceConfigComponent,
      data: {
        title: ' Cấu hình dịch vụ',
        breadcrumb: 'Cấu hình dịch vụ'
      }
    },
    {
      path: 'create',
      component: ServiceConfigCreateComponent,
      data: {
        title: 'Thêm mới cấu hình dịch vụ',
        breadcrumb: 'Thêm mới cấu hình dịch vụ'
      }
    },

    {
      path: ':id',
      component: ServiceConfigUpdateFormComponent,
      data: {
        title: 'Cập nhật cấu hình dịch vụ',
        breadcrumb: 'Cập nhật cấu hình dịch vụ'
      }
    },
  ];
  
  export const ServiceConfigRoute = RouterModule.forChild(routes);