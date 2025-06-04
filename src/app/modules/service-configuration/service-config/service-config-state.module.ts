import { NgModule } from "@angular/core";
import { ServiceConfigService } from "./services/service-config.service";
import { ServiceConfigEffects } from "./state/service-config.effects";
import { EffectsModule } from "@ngrx/effects";
import { ServiceConfigReducer, serviceConfigFeatureKey } from "./state/service-config.reducer";
import { StoreModule } from "@ngrx/store";

@NgModule({
    imports: [
      StoreModule.forFeature(
        serviceConfigFeatureKey,
        ServiceConfigReducer
      ),
      EffectsModule.forFeature([ServiceConfigEffects]),
    ],
  
    providers: [
        ServiceConfigService
    ]
  })
  export class ServiceConfigStateModule {}