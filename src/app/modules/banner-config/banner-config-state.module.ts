import { NgModule } from "@angular/core";
import { BannerConfigFeatureKey, BannerConfigReducer } from "./states/banner-config.reducer";
import { BannerConfigEffects } from "./states/banner-config.effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { BannerConfigService } from "./services/banner-config.service";

@NgModule({
    imports: [
      StoreModule.forFeature(
        BannerConfigFeatureKey,
        BannerConfigReducer
      ),
      EffectsModule.forFeature([BannerConfigEffects]),
    ],
  
    providers: [
        BannerConfigService
    ]
  })
  export class BannerConfigStateModule {}