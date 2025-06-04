import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { VideoConfigurationService } from "./services/video-configuration.service";
import { VideosConfigEffects } from "./states/video-configuration.effects";
import { VideosConfigReducer, videosConfigFeatureKey } from "./states/video-configuration.reducer";

@NgModule({
    imports: [
      StoreModule.forFeature(
        videosConfigFeatureKey,
        VideosConfigReducer
      ),
      EffectsModule.forFeature([VideosConfigEffects]),
    ],
  
    providers: [
        VideoConfigurationService
    ]
  })
  export class VideoConfigurationStateModule {}