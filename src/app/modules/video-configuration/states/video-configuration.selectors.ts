import { createFeatureSelector, createSelector } from "@ngrx/store";
import { VideosConfigState, videosConfigFeatureKey } from "./video-configuration.reducer";

export const selectVideosConfigState =
  createFeatureSelector<VideosConfigState>(videosConfigFeatureKey);

export const selectVideosConfigList = createSelector(
  selectVideosConfigState,
  (state) => {
    return state.items
  }
);

export const selectTotalVideosConfig = createSelector(
  selectVideosConfigState,
  (state) => state.total
);

export const selectVideosConfigLoading = createSelector(
  selectVideosConfigState,
  (state) => state.loading
);

export const selectCurrentVideosConfig = createSelector(
  selectVideosConfigState,
  (state) => state.videosConfig
);

export const selectCreateVideosConfigSuccess = createSelector(
    selectVideosConfigState,
    (state) => state.createVideosConfigSuccess
  );
  
  export const selectCreateVideosConfigError = createSelector(
    selectVideosConfigState,
    (state) => state.createVideosConfigError
  );
  
  export const selectUpdateVideosConfigSuccess = createSelector(
    selectVideosConfigState,
    (state) => state.updateVideosConfigSuccess
  );
  
  export const selectUpdateVideosConfigError = createSelector(
    selectVideosConfigState,
    (state) => state.updateVideosConfigError
  );

  export const selectupdateVideosPrioritySuccess = createSelector(
    selectVideosConfigState,
    (state) => state.updateVideosConfigPrioritySuccess
  );

  export const selectupdateVideosPriorityMainSuccess= createSelector(
    selectVideosConfigState,
    (state) => state.updateVideossPriorityMainSuccess
  );
