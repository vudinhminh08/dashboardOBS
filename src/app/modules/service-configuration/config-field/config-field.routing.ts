import { RouterModule, Routes } from "@angular/router";
import { ConfigFieldComponent } from "./pages/config-field/config-field.component";

const routes: Routes = [
    {
      path: '',
      component: ConfigFieldComponent,
      data: {
        title: ' Cấu hình lĩnh vực',
        breadcrumb: 'Cấu hình lĩnh vực'
      }
    },
  ];
  
  export const ConfigFeildRoute = RouterModule.forChild(routes);