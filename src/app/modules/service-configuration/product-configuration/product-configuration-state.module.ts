import { NgModule } from "@angular/core";
import { ProductConfigurationService } from "./services/product-configuration.service";
import { ProductConfigurationReducer, productConfigurationFeatureKey } from "./state/product-configuration.reducer";
import { ProductConfigurationEffects } from "./state/product-configuration.effects";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";

@NgModule({
    imports: [
      StoreModule.forFeature(
        productConfigurationFeatureKey,
        ProductConfigurationReducer
      ),
      EffectsModule.forFeature([ProductConfigurationEffects]),
    ],
  
    providers: [
        ProductConfigurationService
    ]
  })
  export class ProductConfigurationStateModule {}