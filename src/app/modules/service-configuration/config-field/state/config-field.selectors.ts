import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ConfigFieldState, configFieldFeatureKey } from "./config-field.reducer";

export const selectConfigfieldState =
  createFeatureSelector<ConfigFieldState>(configFieldFeatureKey);

export const selectConfigfieldList = createSelector(
  selectConfigfieldState,
  (state) => state.configFieldList
);

export const selectTotalConfigfield = createSelector(
  selectConfigfieldState,
  (state) => state.total
);

export const selectConfigFieldLoading = createSelector(
  selectConfigfieldState,
  (state) => state.loading
)

export const selectCurrentConfigfield = createSelector(
  selectConfigfieldState,
  (state) => state.configField
);

export const selectCreateConfigfieldSuccess = createSelector(
    selectConfigfieldState,
    (state) => state.createConfigfieldSuccess
  );
  
  export const selectCreateConfigfieldError = createSelector(
    selectConfigfieldState,
    (state) => state.createConfigfieldError
  );
  
  export const selectUpdateConfigfieldSuccess = createSelector(
    selectConfigfieldState,
    (state) => state.updateConfigfieldSuccess
  );
  
  export const selectUpdateConfigfieldError = createSelector(
    selectConfigfieldState,
    (state) => state.updateConfigfieldError
  );

  export const selectUpdateConfigfieldPrioritySuccess = createSelector(
    selectConfigfieldState,
    (state) => state.updateConfigFieldPrioritySuccess
  );
  
  export const selectUpdateConfigFieldPriorityError = createSelector(
    selectConfigfieldState,
    (state) => state.updateConfigFieldPriorityError
  );

  export const selectUpdateServiceGroupPrioritySuccess = createSelector(
    selectConfigfieldState,
    (state) => state.updateServiceGroupPrioritySuccess
  );
  
  export const selectUpdateServiceGroupPriorityError = createSelector(
    selectConfigfieldState,
    (state) => state.updateServiceGroupPriorityError
  );

  export const selectServiceGroupConfigList = createSelector(
    selectConfigfieldState,
    (state) => state.serviceGroupConfigList
  );
  
  export const selectTotalServiceGroupConfig = createSelector(
    selectConfigfieldState,
    (state) => state.total
  );
  
  export const selectCurrentServiceGroupConfig = createSelector(
    selectConfigfieldState,
    (state) => state.serviceGroupConfig
  );
  
  export const selectCreateServiceGroupConfigSuccess = createSelector(
      selectConfigfieldState,
      (state) => state.createServiceGroupConfigSuccess
    );
    
    export const selectCreateServiceGroupConfigError = createSelector(
      selectConfigfieldState,
      (state) => state.createServiceGroupConfigError
    );
    
    export const selectUpdateServiceGroupConfigSuccess = createSelector(
      selectConfigfieldState,
      (state) => state.updateServiceGroupConfigSuccess
    );
    
    export const selectUpdateServiceGroupConfigError = createSelector(
      selectConfigfieldState,
      (state) => state.updateServiceGroupConfigError
    );
