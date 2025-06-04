import { createAction, props } from "@ngrx/store";

export const createServiceConfig = createAction(
    '[ServiceConfig] Create Service Config',
    props<{ payload: any }>()
  );
  
  export const createServiceConfigSuccess = createAction(
    '[ServiceConfig] Create Service Config Success',
    props<{ success: any }>()
  );
  
  export const createServiceConfigFail = createAction(
    '[ServiceConfig] Create Service Config Fail',
    props<{ error: any }>()
  );
  
  export const searchServiceConfig = createAction(
    '[ServiceConfig] Find Service Config',
    props<{ payload: any }>()
  );
  
  export const searchServiceConfigSuccess = createAction(
    '[ServiceConfig] Find Service Config Success',
    props<{ payload: any }>()
  );
  
  export const searchServiceConfigFail = createAction(
    '[ServiceConfig] Find Service Config Fail',
    props<{ error: any }>()
  );

  export const getGlobalListService = createAction(
    '[ServiceConfig] Get Global List',
    props<{ payload: any }>()
  );
  
  export const getGlobalListServiceSuccess = createAction(
    '[ServiceConfig] Get Global List Success',
    props<{ payload: any }>()
  );
  
  export const getGlobalListServiceFail = createAction(
    '[ServiceConfig] Get Global List Fail',
    props<{ error: any }>()
  );
  
  export const updateServiceConfig = createAction(
    '[ServiceConfig] Update Service Config',
    props<{ payload: any }>()
  );
  
  export const updateServiceConfigSuccess = createAction(
    '[ServiceConfig] Update Service Config Success',
    props<{ success: any }>()
  );
  
  export const updateServiceConfigFail = createAction(
    '[ServiceConfig] Update Service Config Fail',
    props<{ error: any }>()
  );
  
  export const findOneServiceConfig = createAction(
    '[ServiceConfig] Find One Service Config',
    props<{ id: string }>()
  );
  
  export const findOneServiceConfigSuccess = createAction(
    '[ServiceConfig] Find One Service Config Success',
    props<{ payload: any }>()
  );
  
  export const findOneServiceConfigFail = createAction(
    '[ServiceConfig] Find One Service Config Fail',
    props<{ error: any }>()
  );


  export const createServiceGroupConfig = createAction(
    '[ServiceGroupConfig] Create Service Config',
    props<{ payload: any }>()
  );
  
  export const createServiceGroupConfigSuccess = createAction(
    '[ServiceGroupConfig] Create Service Config Success',
    props<{ success: any }>()
  );
  
  export const createServiceGroupConfigFail = createAction(
    '[ServiceGroupConfig] Create Service Config Fail',
    props<{ error: any }>()
  );
  
  export const updateServicePriorityConfig = createAction(
    '[ServiceGroupConfig] Service Priority Config',
    props<{ payload: any }>()
  );
  
  export const updateServicePriorityConfigSuccess = createAction(
    '[ServiceGroupConfig] Service Priority Config Success',
    props<{ success: any }>()
  );
  
  export const updateServicePriorityConfigFail = createAction(
    '[ServiceGroupConfig] Service Priority Config Fail',
    props<{ error: any }>()
  );

  export const updateServicesPriorityMain = createAction(
    '[ServiceGroupConfig] Update Priority Main Services',
    props<{  payload: any }>()
  );
  
  export const updateServicesPriorityMainSuccess = createAction(
    '[ServiceGroupConfig] Update Services Priority Main Success',
    props<{ success: any }>()
  );
  
  export const updateServicesPriorityMainFail = createAction(
    '[ServiceGroupConfig] Update Services PriorityMain Fail',
    props<{ error: any }>()
  );
  
  export const updateServiceGroupConfig = createAction(
    '[ServiceGroupConfig] Update Service Config',
    props<{ id: string; payload: any }>()
  );
  
  export const updateServiceGroupConfigSuccess = createAction(
    '[ServiceGroupConfig] Update Service Config Success',
    props<{ success: any }>()
  );
  
  export const updateServiceGroupConfigFail = createAction(
    '[ServiceGroupConfig] Update Service Config Fail',
    props<{ error: any }>()
  );
  
  export const findOneServiceGroupConfig = createAction(
    '[ServiceGroupConfig] Find One Service Config',
    props<{ payload: any }>()
  );
  
  export const findOneServiceGroupConfigSuccess = createAction(
    '[ServiceGroupConfig] Find One Service Config Success',
    props<{ success: any }>()
  );
  
  export const findOneServiceGroupConfigFail = createAction(
    '[ServiceGroupConfig] Find One Service Config Fail',
    props<{ error: any }>()
  );

  
  export const clearStateCreateServiceGroup = createAction(
    '[ServiceGroupConfig] Clear Create Service Success',
 
  ); 
  export const clearStateCreateServiceFeild = createAction(
    '[ServiceGroupConfig] Clear Create Service Field',
 
  ); 
  export const clearStateUpdateService = createAction(
    '[ServiceGroupConfig] Clear Update Service',)
    export const clearStateUpdateServiceError = createAction(
      '[ServiceGroupConfig] Clear Update Service Feild',)
  export const clearStateUpdatePriorityServices = createAction(
      '[ServiceGroupConfig] Clear Update Priority Services',
    )

  ;
  export const clearStateUpdatePriorityMainService = createAction(
      '[ServiceGroupConfig] Clear Update Priority Main Services',
    );

  export const clearStateUpdatePriorityMainServiceError = createAction(
      '[ServiceGroupConfig] Clear Update Priority Main Services Error',
    );