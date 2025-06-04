import { CrudState } from "@core/models";
import { StateUtil } from "@core/utils/state.util";
import * as ProductConfigurationActions from"../state/product-configuration.actions"
import { createReducer, on } from "@ngrx/store";

export const productConfigurationFeatureKey = 'productConfiguration';

export interface ProductConfigurationState extends CrudState {
  productConfigurationList: any[];
  createProductConfigurationSuccess: any
  createProductConfigurationError: any
  updateProductConfigurationSuccess: any
  updateProductConfigurationError: any
  productConfiguration: any
}

export const initialState: ProductConfigurationState = {
  ...StateUtil.initiateCrudState(),
  productConfigurationList: [],
  createProductConfigurationSuccess: null,
  createProductConfigurationError: null,
  updateProductConfigurationSuccess: null,
  updateProductConfigurationError: null,
  productConfiguration: null


};

export const ProductConfigurationReducer = createReducer(
  initialState,
  on(ProductConfigurationActions.createProductConfiguration, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ProductConfigurationActions.createProductConfigurationSuccess,
    (state, { success }) => ({
      ...state,
      createProductConfigurationSuccess: success,
      loading: false
    })
  ),
  on(
    ProductConfigurationActions.createProductConfigurationFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createProductConfigurationError:error
    })
  ),
  on(ProductConfigurationActions.searchProductConfiguration, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ProductConfigurationActions.searchProductConfigurationSuccess,
    (state, { payload }) => ({
      ...state,
      productConfigurationList: payload.data,
      total: payload.totalRecord,
      loading: false
    })
  ),
  on(
    ProductConfigurationActions.searchProductConfigurationFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(ProductConfigurationActions.updateProductConfiguration, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ProductConfigurationActions.updateProductConfigurationSuccess,
    (state, { success }) => ({
      ...state,
     updateProductConfigurationSuccess: success,
      loading: false
    })
  ),
  on(
    ProductConfigurationActions.updateProductConfigurationFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateProductConfigurationError: error
    })
  ),
  on(ProductConfigurationActions.findOneProductConfiguration, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ProductConfigurationActions.findOneProductConfigurationSuccess,
    (state, { payload }) => ({
      ...state,
      productConfiguration: payload.data,
      loading: false
    })
  ),
  on(
    ProductConfigurationActions.findOneProductConfigurationFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
)