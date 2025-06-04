import { createAction, props } from "@ngrx/store";

export const createMainServices = createAction(
    '[MainServices] Create Main Services',
    props<{ payload: any }>()
  );
  
  export const createMainServicesSuccess = createAction(
    '[MainServices] Create Main Services Success',
    props<{ success: any }>()
  );
  
  export const createMainServicesFail = createAction(
    '[MainServices] Create Main Services Fail',
    props<{ error: any }>()
  );
  
  export const searchMainServices = createAction(
    '[MainServices] Find Treatment Faculties',
    props<{ payload: any }>()
  );
  
  export const searchMainServicesSuccess = createAction(
    '[MainServices] Find Treatment Faculties Success',
    props<{ payload: any }>()
  );
  
  export const searchMainServicesFail = createAction(
    '[MainServices] Find Treatment Faculties Fail',
    props<{ error: any }>()
  );
  
  export const updateMainServices = createAction(
    '[MainServices] Update Main Services',
    props<{  payload: any }>()
  );
  
  export const updateMainServicesSuccess = createAction(
    '[MainServices] Update Main Services Success',
    props<{ success: any }>()
  );
  
  export const updateMainServicesFail = createAction(
    '[MainServices] Update Main Services Fail',
    props<{ error: any }>()
  );


  export const updateMainServicesPriority = createAction(
    '[MainServices] Update Main Priority Services',
    props<{  payload: any }>()
  );
  
  export const updateMainServicesPrioritySuccess = createAction(
    '[MainServices] Update Main Services Priority Success',
    props<{ success: any }>()
  );
  
  export const updateMainServicesPriorityFail = createAction(
    '[MainServices] Update Main Services Priority Fail',
    props<{ error: any }>()
  );

  
  export const findOneMainServices = createAction(
    '[MainServices] Find One Main Services',
    props<{ id: string }>()
  );
  
  export const findOneMainServicesSuccess = createAction(
    '[MainServices] Find One Main Services Success',
    props<{ payload: any }>()
  );
  
  export const findOneMainServicesFail = createAction(
    '[MainServices] Find One Main Services Fail',
    props<{ error: any }>()
  );

  export const clearStateCreateMainServices = createAction(
    '[MainServices] Clear Create Main Services',
 
  );

  export const clearStateCreateMainServicesError = createAction(
    '[MainServices] Clear Create Main Services Error',
 
  );
   export const clearStateUpdateMainServices = createAction(
    '[MainServices] Clear Update Main Services',
  );

  export const clearStateUpdateMainServicesError = createAction(
    '[MainServices] Clear Update Main Services Error',
  );

  export const clearStateUpdatePriorityServices = createAction(
    '[MainServices] Clear Update Priority Services',
  );
  export const clearStateUpdatePriorityServicesError = createAction(
    '[MainServices] Clear Update Priority Services Error',
  );

  