import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductConfigurationState, productConfigurationFeatureKey } from "./product-configuration.reducer";

export const selectProductConfigurationState =
  createFeatureSelector<ProductConfigurationState>(productConfigurationFeatureKey);

export const selectProductConfigurationList = createSelector(
  selectProductConfigurationState,
  (state) => state.productConfigurationList
);

export const selectTotalProductConfiguration = createSelector(
  selectProductConfigurationState,
  (state) => state.total
);

export const selectCurrentProductConfiguration = createSelector(
  selectProductConfigurationState,
  (state) => state.productConfiguration
);

export const selectCreateProductConfigurationSuccess = createSelector(
    selectProductConfigurationState,
    (state) => state.createProductConfigurationSuccess
  );
  
  export const selectCreateProductConfigurationError = createSelector(
    selectProductConfigurationState,
    (state) => state.createProductConfigurationError
  );
  
  export const selectUpdateProductConfigurationSuccess = createSelector(
    selectProductConfigurationState,
    (state) => state.updateProductConfigurationSuccess
  );
  
  export const selectUpdateProductConfigurationError = createSelector(
    selectProductConfigurationState,
    (state) => state.updateProductConfigurationError
  );
