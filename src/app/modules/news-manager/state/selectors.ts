import { createFeatureSelector, createSelector } from '@ngrx/store';
import { newsManagerFeatureKey, NewsManagerState } from './reducer';

export const selectNewsState =
  createFeatureSelector<NewsManagerState>(newsManagerFeatureKey);


export const selectDataListNews = createSelector(
  selectNewsState, (state) => state.listNews.data
);
export const selectLoadingListNews = createSelector(
  selectNewsState, (state) => state.listNews.loading
);
export const selectTotalListNews = createSelector(
  selectNewsState, (state) => state.listNews.totalItem
);