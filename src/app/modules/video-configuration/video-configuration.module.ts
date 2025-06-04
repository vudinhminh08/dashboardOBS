import { NgModule } from "@angular/core";
import { VideoConfigurationRoute } from "./video-configuration.routing";
import { SharedModule } from "@shared/shared.module";
import { CommonModule } from "@angular/common";
import { VideoConfigComponent } from "./pages/video-config/video-config.component";
import { VideoConfigurationModalComponent } from "./components/video-configuration-modal/video-configuration-modal.component";
import { VideoConfigurationFormComponent } from "./components/video-configuration-form/video-configuration-form.component";
import { VideoConfigurationStateModule } from "./video-configuration-state.module";
import { ConfigFeildStateModule } from "@modules/service-configuration/config-field/config-field-state.module";
import { ServiceConfigStateModule } from "@modules/service-configuration/service-config/service-config-state.module";

@NgModule({
    imports: [
        VideoConfigurationStateModule,
        CommonModule,
        SharedModule,
        VideoConfigurationRoute,
        ConfigFeildStateModule,
        ServiceConfigStateModule

    ],
    declarations: [VideoConfigurationFormComponent,
        VideoConfigurationModalComponent,
        VideoConfigComponent]
  })
  export class VideoConfigurationModule { }