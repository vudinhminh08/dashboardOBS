import {createAction, props} from "@ngrx/store";
import { createHTTPActions } from '@core/utils/state.util';
import { GetListNewsRequest } from '../models';

export const [
  getListNews,
  getListNewsSuccess,
  getListNewsFail
] = createHTTPActions<GetListNewsRequest, any, any>(
  '[NewsManager] Get List News Article'
);
export const clearStateListNews = createAction('[NewsManager] Clear State List News Article');