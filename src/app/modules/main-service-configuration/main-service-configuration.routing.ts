import { RouterModule, Routes } from "@angular/router";
import { MainServiceConfigurationComponent } from "./pages/main-service-configuration/main-service-configuration.component";

const routes: Routes = [
    {
      path: 'main-service-configuration',
      component: MainServiceConfigurationComponent,
      data: {
        title: 'Danh sách',
        breadcrumb: 'Danh sách'
      }
    },
  ];
  
  export const MainServiceConfigurationRoute = RouterModule.forChild(routes);