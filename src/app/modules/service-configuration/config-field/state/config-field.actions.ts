import { createAction, props } from "@ngrx/store";

export const createConfigField = createAction(
    '[ConfigField] Create Config Field',
    props<{ payload: any }>()
  );
  
  export const createConfigFieldSuccess = createAction(
    '[ConfigField] Create Config Field Success',
    props<{ success: any }>()
  );
  
  export const createConfigFieldFail = createAction(
    '[ConfigField] Create Config Field Fail',
    props<{ error: any }>()
  );
  
  export const searchConfigField = createAction(
    '[ConfigField] Find Config Field',
    props<{ param: any }>()
  );
  
  export const searchConfigFieldSuccess = createAction(
    '[ConfigField] Find Config Field Success',
    props<{ param: any }>()
  );
  
  export const searchConfigFieldFail = createAction(
    '[ConfigField] Find Config Field Fail',
    props<{ error: any }>()
  );
  
  export const updateConfigField = createAction(
    '[ConfigField] Update Config Field',
    props<{ payload: any }>()
  );
  
  export const updateConfigFieldSuccess = createAction(
    '[ConfigField] Update Config Field Success',
    props<{ success: any }>()
  );
  
  export const updateConfigFieldFail = createAction(
    '[ConfigField] Update Config Field Fail',
    props<{ error: any }>()
  );
  
  export const findOneConfigField = createAction(
    '[ConfigField] Find One Config Field',
    props<{ id: string }>()
  );
  
  export const findOneConfigFieldSuccess = createAction(
    '[ConfigField] Find One Config Field Success',
    props<{ payload: any }>()
  );
  
  export const findOneConfigFieldFail = createAction(
    '[ConfigField] Find One Config Field Fail',
    props<{ error: any }>()
  );

  export const createServiceGroupConfig = createAction(
    '[ConfigField] Create Service Group Config',
    props<{ payload: any }>()
  );
  
  export const createServiceGroupConfigSuccess = createAction(
    '[ConfigField] Create Service Group Config Success',
    props<{ success: any }>()
  );
  
  export const createServiceGroupConfigFail = createAction(
    '[ConfigField] Create Service Group Config Fail',
    props<{ error: any }>()
  );
  
  export const searchServiceGroupConfig = createAction(
    '[ConfigField] Search Service Group Config',
    props<{ payload: any }>()
  );
  
  export const searchServiceGroupConfigSuccess = createAction(
    '[ConfigField] Search Service Group Config Success',
    props<{ payload: any }>()
  );
  
  export const searchServiceGroupConfigFail = createAction(
    '[ConfigField] Search Service Group Config Fail',
    props<{ error: any }>()
  );
  
  export const updateServiceGroupConfig = createAction(
    '[ConfigField] Update Service Group Config',
    props<{ id: string; payload: any }>()
  );
  
  export const updateServiceGroupConfigSuccess = createAction(
    '[ConfigField] Update Service Group Config Success',
    props<{ success: any }>()
  );
  
  export const updateServiceGroupConfigFail = createAction(
    '[ConfigField] Update Service Group Config Fail',
    props<{ error: any }>()
  );
  
  export const findOneServiceGroupConfig = createAction(
    '[ConfigField] Find One Service Group Config',
    props<{ id: string }>()
  );
  
  export const findOneServiceGroupConfigSuccess = createAction(
    '[ConfigField] Find One Service Group Config Success',
    props<{ payload: any }>()
  );
  
  export const findOneServiceGroupConfigFail = createAction(
    '[ConfigField] Find One Service Group Config Fail',
    props<{ error: any }>()
  );

  export const clearStateCreateConfigField = createAction(
    '[ConfigField] Clear Create Config Fail',
  );

  export const clearStateCreateGroupService = createAction(
    '[ConfigField] Clear Create Service Group',
  )

  export const clearStateCreateConfigFieldError = createAction(
    '[ConfigField] Clear Create Config Fail Error',
  );

  export const clearStateCreateGroupServiceError = createAction(
    '[ConfigField] Clear Create Service Group Error',
  )
  ; export const clearStateUpdateConfigField = createAction(
    '[ConfigField] Clear Update Config Fail',
 
  )
  ; export const clearStateUpdateConfigFieldError = createAction(
    '[ConfigField] Clear Update Config Fail Error',
 
  )
  ; export const clearStateUpdateGroupService = createAction(
    '[ConfigField] Clear Update Service Group Config Field',
  );
  export const clearStateUpdateGroupServiceError = createAction(
    '[ConfigField] Clear Update Service Group Config Field Error',
  );

  export const updateConfigFieldPriority = createAction(
    '[ConfigField] Update Config Field Priority ',
    props<{  payload: any }>()
  );
  
  export const updateConfigFieldPrioritySuccess = createAction(
    '[ConfigField] Update Config Field  Priority Success',
    props<{ success: any }>()
  );
  
  export const updateConfigFieldPriorityFail = createAction(
    '[ConfigField] Update Config Field  Priority Fail',
    props<{ error: any }>()
  );

  export const updateServiceGroupPriority = createAction(
    '[ConfigField] Update Service Group Priority',
    props<{  payload: any }>()
  );
  
  export const updateServiceGroupPrioritySuccess = createAction(
    '[ConfigField] Update Service Group Priority Success',
    props<{ success: any }>()
  );
  
  export const updateServiceGroupPriorityFail = createAction(
    '[ConfigField] Update Service Group Priority Fail',
    props<{ error: any }>()
  );

  export const clearStateUpdateConfigFieldPrioritySuccess = createAction(
    '[ConfigField] Clear Update Config Field Priority ',
 
  ); export const clearStateUpdateGroupServicePrioritySuccess = createAction(
    '[ConfigField] Clear Update Service Group Priority',
  );

  export const clearStateUpdateConfigFieldPriorityError = createAction(
    '[ConfigField] Clear Update Config Field Priority Error',
 
  ); export const clearStateUpdateGroupServicePriorityError = createAction(
    '[ConfigField] Clear Update Service Group Priority Error',
  );