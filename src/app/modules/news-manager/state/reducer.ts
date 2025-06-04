import {createReducer, on} from "@ngrx/store";
import * as NewsManagerActions from './actions';

export const newsManagerFeatureKey = 'newsManager';

export interface NewsManagerState {
  listNews: {data: any[], totalItem: number, loading: boolean, error: any}
}

const initialState: NewsManagerState = {
  listNews: {data: [], totalItem: 0, loading: false, error: null},
};

export const NewsManagerReducer = createReducer(
  initialState,

  on(NewsManagerActions.getListNews, (state) => ({
    ...state,
    listNews: {...state.listNews, loading: true},
  })),
  on(NewsManagerActions.getListNewsSuccess, (state, res) => ({
    ...state,
    listNews: {
      ...state.listNews,
      loading: false,
      data: res.payload.content,
      totalItem: res.payload.totalElements
    },
  })),
  on(NewsManagerActions.getListNewsFail, (state, {error}) => ({
    ...state,
    listNews: {...initialState.listNews, loading: false, error: error},
  })),
  on(NewsManagerActions.clearStateListNews, (state) => ({
    ...state,
    listNews: initialState.listNews,
  })),

)
