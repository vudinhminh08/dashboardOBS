import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { MainServiceConfigurationService } from "./services/main-service-configuration.service";
import { MainServicesReducer, mainServicesFeatureKey } from "./state/main-service-configuration.reducer";
import { MainServicesEffects } from "./state/main-service-configuration.effects";

@NgModule({
    imports: [
      StoreModule.forFeature(
        mainServicesFeatureKey,
        MainServicesReducer
      ),
      EffectsModule.forFeature([MainServicesEffects]),
    ],
  
    providers: [
        MainServiceConfigurationService
    ]
  })
  export class MainServiceConfigurationStateModule {}