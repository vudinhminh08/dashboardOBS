import { CrudState } from "@core/models";
import * as VideosConfigActions from"./video-configuration.actions"
import { StateUtil } from "@core/utils/state.util";
import { createReducer, on } from "@ngrx/store";

export const videosConfigFeatureKey = 'videosConfig';

export interface VideosConfigState extends CrudState {
  videosConfigList: any[];
  createVideosConfigSuccess: any
  createVideosConfigError: any
  updateVideosConfigSuccess: any
  updateVideosConfigError: any
  videosConfig: any
  updateVideosConfigPrioritySuccess: any
  updateVideosConfigPriorityError: any
  updateVideossPriorityMainSuccess: any
  updateVideossPriorityMainError: any
}

export const initialState: VideosConfigState = {
  ...StateUtil.initiateCrudState(),
  videosConfigList: [],
  createVideosConfigSuccess: null,
  createVideosConfigError: null,
  updateVideosConfigSuccess: null,
  updateVideosConfigError: null,
  videosConfig: null,
  updateVideosConfigPrioritySuccess: null,
  updateVideosConfigPriorityError: null,
  updateVideossPriorityMainSuccess: null,
  updateVideossPriorityMainError: null,

};

export const VideosConfigReducer = createReducer(
  initialState,
  on(VideosConfigActions.createVideosConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    VideosConfigActions.createVideosConfigSuccess,
    (state, { success }) => ({
      ...state,
      createVideosConfigSuccess: true,
      loading: false
    })
  ),
  on(
    VideosConfigActions.createVideosConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createVideosConfigError:error
    })
  ),
  on(VideosConfigActions.searchVideosConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    VideosConfigActions.searchVideosConfigSuccess,
    (state, { payload }) => ({
      ...state,
      items: payload?.content,
      total: payload.totalElements,
      loading: false
    })
  ),
  on(
    VideosConfigActions.searchVideosConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(VideosConfigActions.updateVideosConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    VideosConfigActions.updateVideosConfigSuccess,
    (state, { success }) => ({
      ...state,
     updateVideosConfigSuccess: true,
      loading: false
    })
  ),
  on(
    VideosConfigActions.updateVideosConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateVideosConfigError: error
    })
  ),
  on(VideosConfigActions.findOneVideosConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    VideosConfigActions.findOneVideosConfigSuccess,
    (state, { payload }) => ({
      ...state,
      videosConfig: payload.data,
      loading: false
    })
  ),
  on(
    VideosConfigActions.findOneVideosConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(
    VideosConfigActions.updateVideosPrioritySuccess,
    (state, { success }) => ({
      ...state,
     updateVideosConfigPrioritySuccess: true,
      loading: false
    })
  ),
  on(
    VideosConfigActions.updateVideosPriorityFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateVideosConfigPriorityError: error
    })
  ),
  on(
    VideosConfigActions.updateVideosPriorityMainSuccess,
    (state, { success }) => ({
      ...state,
     updateVideossPriorityMainSuccess: true,
      loading: false
    })
  ),
  on(
    VideosConfigActions.updateVideosPriorityMainFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateVideossPriorityMainError: error
    })
  ),
  on(
    VideosConfigActions.clearStateCreateVideosConfig,
    (state, {  }) => ({
      ...state,
      createVideosConfigSuccess: false
    })
  ),  
  on(
    VideosConfigActions.clearStateCreateVideosConfigError,
    (state, {  }) => ({
      ...state,
      createVideosConfigError: null
    })
  ),  
  on(
    VideosConfigActions.clearStateUpdateVideosConfig,
    (state, {  }) => ({
      ...state,
      updateVideosConfigSuccess: false
    })
  ),

  on(
    VideosConfigActions.clearStateUpdateVideosConfigError,
    (state, {  }) => ({
      ...state,
      updateVideosConfigError: null
    })
  ),
  on(
    VideosConfigActions.clearStateUpdatePriorityVideos,
    (state, {  }) => ({
      ...state,
      updateVideosConfigPrioritySuccess: false
    })
  ),  on(
    VideosConfigActions.clearStateUpdatePriorityVideosMain,
    (state, {  }) => ({
      ...state,
      updateVideossPriorityMainSuccess: false
    })
  ),
)