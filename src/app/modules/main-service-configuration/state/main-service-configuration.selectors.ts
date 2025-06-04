import { createFeatureSelector, createSelector } from "@ngrx/store";
import { MainServicesState, mainServicesFeatureKey } from "./main-service-configuration.reducer";

export const selectMainServicesState =
  createFeatureSelector<MainServicesState>(mainServicesFeatureKey);

export const selectMainServicesList = createSelector(
  selectMainServicesState,
  (state) => state.mainServicesList
);

export const selectTotalMainServices = createSelector(
  selectMainServicesState,
  (state) => state.total
);

export const selectLoadingMainServices = createSelector(
  selectMainServicesState,
  (state) => state.loading
);

export const selectCurrentMainServices = createSelector(
  selectMainServicesState,
  (state) => state.mainServices
);

export const selectCreateMainServicesSuccess = createSelector(
    selectMainServicesState,
    (state) => state.createMainServicesSuccess
  );
  
  export const selectCreateMainServicesError = createSelector(
    selectMainServicesState,
    (state) => state.createMainServicesError
  );
  
  export const selectUpdateMainServicesSuccess = createSelector(
    selectMainServicesState,
    (state) => state.updateMainServicesSuccess
  );
  
  export const selectUpdateMainServicesError = createSelector(
    selectMainServicesState,
    (state) => state.updateMainServicesError
  );

  export const selectUpdateMainServicesPrioritySuccess = createSelector(
    selectMainServicesState,
    (state) => state.updateMainServicesPrioritySuccess
  );
  
  export const selectUpdateMainServicesPriorityError = createSelector(
    selectMainServicesState,
    (state) => state.updateMainServicesPriorityError
  );
