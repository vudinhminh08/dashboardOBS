import { RouterModule, Routes } from "@angular/router";
import { ProductConfigurationComponent } from "./pages/product-configuration/product-configuration.component";

const routes: Routes = [
    {
      path: '',
      component: ProductConfigurationComponent,
      data: {
        title: ' Cấu hình sản phẩm',
        breadcrumb: 'Cấu hình sản phẩm'
      }
    },
  ];
  
  export const ProductConfigurationRoute = RouterModule.forChild(routes);