import { createAction, props } from "@ngrx/store";

export const createBannerConfig = createAction(
    '[BannerConfig] Create Banner Config',
    props<{ payload: any }>()
  );
  
  export const createBannerConfigSuccess = createAction(
    '[BannerConfig] Create Banner Config Success',
    props<{ success: any }>()
  );
  
  export const createBannerConfigFail = createAction(
    '[BannerConfig] Create Banner Config Fail',
    props<{ error: any }>()
  );
  
  export const searchBannerConfig = createAction(
    '[BannerConfig] Search Banner Config',
    props<{ payload: any }>()
  );
  
  export const searchBannerConfigSuccess = createAction(
    '[BannerConfig] Search Banner Config Success',
    props<{ payload: any }>()
  );
  
  export const searchBannerConfigFail = createAction(
    '[BannerConfig] Search Banner Config Fail',
    props<{ error: any }>()
  );
  
  export const updateBannerConfig = createAction(
    '[BannerConfig] Update Banner Config',
    props<{ id: string; payload: any }>()
  );
  
  export const updateBannerConfigSuccess = createAction(
    '[BannerConfig] Update Banner Config Success',
    props<{ success: any }>()
  );
  
  export const updateBannerConfigFail = createAction(
    '[BannerConfig] Update Banner Config Fail',
    props<{ error: any }>()
  );
  
  export const findOneBannerConfig = createAction(
    '[BannerConfig] Find One Banner Config',
    props<{ payload: any }>()
  );
  
  export const findOneBannerConfigSuccess = createAction(
    '[BannerConfig] Find One Banner Config Success',
    props<{ payload: any }>()
  );
  
  export const findOneBannerConfigFail = createAction(
    '[BannerConfig] Find One Banner Config Fail',
    props<{ error: any }>()
  );

  export const clearStateCreateBannerConfig = createAction(
    '[BannerConfig] Clear Create Config ',
  );
  export const clearStateCreateBannerConfigError = createAction(
    '[BannerConfig] Clear Create Config Error',
  );
  export const clearStateUpdateBannerConfig = createAction(
    '[BannerConfig] Clear Update Config ',
  )
  export const clearStateUpdateBannerConfigError = createAction(
    '[BannerConfig] Clear Update Config Error',
  )

  export const clearStateCurrentBannerConfig = createAction(
    '[BannerConfig] Clear Current Config ',
  )