import { NgModule } from "@angular/core";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ConfigFeildService } from "./services/config-field.service";
import { ConfigFieldReducer, configFieldFeatureKey } from "./state/config-field.reducer";
import { ConfigFieldEffects } from "./state/config-field.effects";

@NgModule({
    imports: [
      StoreModule.forFeature(
        configFieldFeatureKey,
        ConfigFieldReducer
      ),
      EffectsModule.forFeature([ConfigFieldEffects]),
    ],
  
    providers: [
        ConfigFeildService
    ]
  })
  export class ConfigFeildStateModule {}