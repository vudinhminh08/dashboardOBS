import { CrudState } from "@core/models";
import { StateUtil } from "@core/utils/state.util";
import { createReducer, on } from "@ngrx/store";
import * as BannerConfigActions from"./banner-config.actions"

export const BannerConfigFeatureKey = 'BannerConfig';

export interface BannerConfigState extends CrudState {
  BannerConfigList: any[];
  createBannerConfigSuccess: any
  createBannerConfigError: any
  updateBannerConfigSuccess: any
  updateBannerConfigError: any
  BannerConfig: any
}

export const initialState: BannerConfigState = {
  ...StateUtil.initiateCrudState(),
  BannerConfigList: [],
  createBannerConfigSuccess: null,
  createBannerConfigError: null,
  updateBannerConfigSuccess: null,
  updateBannerConfigError: null,
  BannerConfig: null


};

export const BannerConfigReducer = createReducer(
  initialState,
  on(BannerConfigActions.createBannerConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    BannerConfigActions.createBannerConfigSuccess,
    (state, { success }) => ({
      ...state,
      createBannerConfigSuccess: true,
      loading: false
    })
  ),
  on(
    BannerConfigActions.createBannerConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createBannerConfigError:error
    })
  ),
  on(BannerConfigActions.searchBannerConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    BannerConfigActions.searchBannerConfigSuccess,
    (state, { payload }) => ({
      ...state,
      items: payload?.content,
      total: payload.totalElements,
      loading: false
    })
  ),
  on(
    BannerConfigActions.searchBannerConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(BannerConfigActions.updateBannerConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    BannerConfigActions.updateBannerConfigSuccess,
    (state, { success }) => ({
      ...state,
     updateBannerConfigSuccess: true,
      loading: false
    })
  ),
  on(
    BannerConfigActions.updateBannerConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateBannerConfigError: error
    })
  ),
  on(BannerConfigActions.findOneBannerConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    BannerConfigActions.findOneBannerConfigSuccess,
    (state, { payload }) => ({
      ...state,
      BannerConfig: payload,
      loading: false
    })
  ),
  on(
    BannerConfigActions.findOneBannerConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(
    BannerConfigActions.clearStateCreateBannerConfig,
    (state, {  }) => ({
      ...state,
      createBannerConfigSuccess: false
    })
  ),  
  on(
    BannerConfigActions.clearStateUpdateBannerConfig,
    (state, {  }) => ({
      ...state,
      updateBannerConfigSuccess: false
    })
  ),
  on(
    BannerConfigActions.clearStateCurrentBannerConfig,
    (state, {  }) => ({
      ...state,
      BannerConfig: null
    })
  ),
)