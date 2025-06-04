import { createAction, props } from "@ngrx/store";

export const createVideosConfig = createAction(
    '[VideosConfig] Create Videos Config',
    props<{ payload: any }>()
  );
  
  export const createVideosConfigSuccess = createAction(
    '[VideosConfig] Create Videos Config Success',
    props<{ success: any }>()
  );
  
  export const createVideosConfigFail = createAction(
    '[VideosConfig] Create Videos Config Fail',
    props<{ error: any }>()
  );
  
  export const searchVideosConfig = createAction(
    '[VideosConfig] Search Videos Config',
    props<{ payload: any }>()
  );
  
  export const searchVideosConfigSuccess = createAction(
    '[VideosConfig] Search Videos Config Success',
    props<{ payload: any }>()
  );
  
  export const searchVideosConfigFail = createAction(
    '[VideosConfig] Search Videos Config Fail',
    props<{ error: any }>()
  );
  
  export const updateVideosConfig = createAction(
    '[VideosConfig] Update Videos Config',
    props<{ id: string; payload: any }>()
  );
  
  export const updateVideosConfigSuccess = createAction(
    '[VideosConfig] Update Videos Config Success',
    props<{ success: any }>()
  );
  
  export const updateVideosConfigFail = createAction(
    '[VideosConfig] Update Videos Config Fail',
    props<{ error: any }>()
  );
  
  export const findOneVideosConfig = createAction(
    '[VideosConfig] Find One Videos Config',
    props<{ id: string }>()
  );
  
  export const findOneVideosConfigSuccess = createAction(
    '[VideosConfig] Find One Videos Config Success',
    props<{ payload: any }>()
  );
  
  export const findOneVideosConfigFail = createAction(
    '[VideosConfig] Find One Videos Config Fail',
    props<{ error: any }>()
  );

  export const clearStateCreateVideosConfig = createAction(
    '[VideosConfig] Clear Create Video Success',
  );

  export const clearStateCreateVideosConfigError = createAction(
    '[VideosConfig] Clear Create Video Error',
  );


  export const clearStateUpdateVideosConfig = createAction(
    '[VideosConfig] Clear Update Video Success',
  )

  export const clearStateUpdateVideosConfigError = createAction(
    '[VideosConfig] Clear Update Video Success',
  )

  
  export const updateVideosPriority = createAction(
    '[VideosConfig] Update Priority Videos',
    props<{  payload: any }>()
  );
  
  export const updateVideosPrioritySuccess = createAction(
    '[VideosConfig] Update Videos Priority Success',
    props<{ success: any }>()
  );
  
  export const updateVideosPriorityFail = createAction(
    '[VideosConfig] Update Videos Priority Fail',
    props<{ error: any }>()
  );

  export const updateVideosPriorityMain = createAction(
    '[VideosConfig] Update Priority Videos Main',
    props<{  payload: any }>()
  );
  
  export const updateVideosPriorityMainSuccess = createAction(
    '[VideosConfig] Update Videos Priority Main Success',
    props<{ success: any }>()
  );
  
  export const updateVideosPriorityMainFail = createAction(
    '[VideosConfig] Update Videos Priority Main Fail',
    props<{ error: any }>()
  );
  

  export const clearStateUpdatePriorityVideos = createAction(
    '[VideosConfig] Clear Update Priority Videos',
  );

  export const clearStateUpdatePriorityVideosMain = createAction(
    '[VideosConfig] Clear Update Priority Main Videos ',
  )