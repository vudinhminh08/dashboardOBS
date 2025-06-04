import { createFeatureSelector, createSelector } from "@ngrx/store";
import { BannerConfigFeatureKey, BannerConfigState } from "./banner-config.reducer";

export const selectBannerConfigState =
  createFeatureSelector<BannerConfigState>(BannerConfigFeatureKey);

export const selectBannerConfigList = createSelector(
  selectBannerConfigState,
  (state) => {
    return state.items
  }
);

export const selectTotalBannerConfig = createSelector(
  selectBannerConfigState,
  (state) => state.total
);

export const selectBannerConfigLoading = createSelector(
  selectBannerConfigState,
  (state) => state.loading
);

export const selectCurrentBannerConfig = createSelector(
  selectBannerConfigState,
  (state) => state.BannerConfig
);

export const selectCreateBannerConfigSuccess = createSelector(
    selectBannerConfigState,
    (state) => state.createBannerConfigSuccess
  );
  
  export const selectCreateBannerConfigError = createSelector(
    selectBannerConfigState,
    (state) => state.createBannerConfigError
  );
  
  export const selectUpdateBannerConfigSuccess = createSelector(
    selectBannerConfigState,
    (state) => state.updateBannerConfigSuccess
  );
  
  export const selectUpdateBannerConfigError = createSelector(
    selectBannerConfigState,
    (state) => state.updateBannerConfigError
  );
