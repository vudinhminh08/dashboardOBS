import { RouterModule, Routes } from "@angular/router";
import { BannerConfigListComponent } from "./pages/banner-config-list/banner-config-list.component";

const routes: Routes = [
    {
      path: 'banner-config',
      component: BannerConfigListComponent,
      data: {
        title: 'Danh sách',
        breadcrumb: 'Danh sách'
      }
    },
  ];
  
  export const BannerConfigRoute = RouterModule.forChild(routes);