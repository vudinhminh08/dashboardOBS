import { createAction, props } from "@ngrx/store";

export const createProductConfiguration = createAction(
    '[ProductConfiguration] Create Product Configuration',
    props<{ payload: any }>()
  );
  
  export const createProductConfigurationSuccess = createAction(
    '[ProductConfiguration] Create Product Configuration Success',
    props<{ success: any }>()
  );
  
  export const createProductConfigurationFail = createAction(
    '[ProductConfiguration] Create Product Configuration Fail',
    props<{ error: any }>()
  );
  
  export const searchProductConfiguration = createAction(
    '[ProductConfiguration] Find Treatment Faculties',
    props<{ payload: any }>()
  );
  
  export const searchProductConfigurationSuccess = createAction(
    '[ProductConfiguration] Find Treatment Faculties Success',
    props<{ payload: any }>()
  );
  
  export const searchProductConfigurationFail = createAction(
    '[ProductConfiguration] Find Treatment Faculties Fail',
    props<{ error: any }>()
  );
  
  export const updateProductConfiguration = createAction(
    '[ProductConfiguration] Update Product Configuration',
    props<{ id: string; payload: any }>()
  );
  
  export const updateProductConfigurationSuccess = createAction(
    '[ProductConfiguration] Update Product Configuration Success',
    props<{ success: any }>()
  );
  
  export const updateProductConfigurationFail = createAction(
    '[ProductConfiguration] Update Product Configuration Fail',
    props<{ error: any }>()
  );
  
  export const findOneProductConfiguration = createAction(
    '[ProductConfiguration] Find One Product Configuration',
    props<{ id: string }>()
  );
  
  export const findOneProductConfigurationSuccess = createAction(
    '[ProductConfiguration] Find One Product Configuration Success',
    props<{ payload: any }>()
  );
  
  export const findOneProductConfigurationFail = createAction(
    '[ProductConfiguration] Find One Product Configuration Fail',
    props<{ error: any }>()
  );