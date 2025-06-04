import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ServiceConfigState, serviceConfigFeatureKey } from "./service-config.reducer";

export const selectServiceConfigState =
  createFeatureSelector<ServiceConfigState>(serviceConfigFeatureKey);

  export const selectGlobelList = createSelector(
    selectServiceConfigState,
    (state) => state.globalList
  );

export const selectServiceConfigList = createSelector(
  selectServiceConfigState,
  (state) => state.serviceConfigList
);

export const selectTotalServiceConfig = createSelector(
  selectServiceConfigState,
  (state) => state.total
);

export const selectLoadingServiceConfig = createSelector(
  selectServiceConfigState,
  (state) => state.loading
);

export const selectCurrentServiceConfig = createSelector(
  selectServiceConfigState,
  (state) => state.serviceGroupConfig
);

export const selectCreateServiceConfigSuccess = createSelector(
    selectServiceConfigState,
    (state) => state.createServiceConfigSuccess
  );
  
  export const selectCreateServiceConfigError = createSelector(
    selectServiceConfigState,
    (state) => state.createServiceConfigError
  );
  
  export const selectUpdateServiceConfigSuccess = createSelector(
    selectServiceConfigState,
    (state) => state.updateServiceConfigSuccess
  );

  export const selectUpdateServiceConfigError = createSelector(
    selectServiceConfigState,
    (state) => state.updateServiceConfigError
  );
  
  export const selectUpdateServiceConfigPriority = createSelector(
    selectServiceConfigState,
    (state) => state.updateServiceConfigPriority
  );

  export const selectUpdateServiceConfigPrioritySuccess = createSelector(
    selectServiceConfigState,
    (state) => state.updateServiceConfigPrioritySuccess
  );
  
  export const selectUpdateServiceConfigPriorityError = createSelector(
    selectServiceConfigState,
    (state) => state.updateServiceConfigPriorityError
  );

  export const selectUpdateServiceConfigPriorityMainSuccess = createSelector(
    selectServiceConfigState,
    (state) => state.updateServicesPriorityMainSuccess
  );
  
  export const selectUpdateServiceConfigPriorityMainError = createSelector(
    selectServiceConfigState,
    (state) => state.updateServicesPriorityMainError
  );

  ///

 
  
