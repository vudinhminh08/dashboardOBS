import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CategoriesConfigEffects } from './effects';
import {
  categoriesConfigFeatureKey,
  CategoriesConfigReducer,
} from './reducer';
import { CategoriesConfigServices } from './service';


@NgModule({
  imports: [
    StoreModule.forFeature(categoriesConfigFeatureKey, CategoriesConfigReducer),
    EffectsModule.forFeature([CategoriesConfigEffects])
  ],
  providers: [
    CategoriesConfigServices,
  ]
})
export class CategoriesConfigStoreModule { }
