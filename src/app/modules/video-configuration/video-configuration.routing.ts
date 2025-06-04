import { RouterModule, Routes } from "@angular/router";
import { VideoConfigComponent } from "./pages/video-config/video-config.component";

const routes: Routes = [
    {
      path: 'video-configuration',
      component: VideoConfigComponent,
      data: {
        title: 'Danh sách',
        breadcrumb: 'Danh sách'
      }
    },
  ];
  
  export const VideoConfigurationRoute = RouterModule.forChild(routes);