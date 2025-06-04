import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NewsManagerEffects } from './effects';
import { newsManagerFeatureKey, NewsManagerReducer } from './reducer';
import { NewsManagerServices } from './service';


@NgModule({
  imports: [
    StoreModule.forFeature(newsManagerFeatureKey, NewsManagerReducer),
    EffectsModule.forFeature([NewsManagerEffects])
  ],
  providers: [
    NewsManagerServices,
  ]
})
export class NewsManagerStoreModule { }
