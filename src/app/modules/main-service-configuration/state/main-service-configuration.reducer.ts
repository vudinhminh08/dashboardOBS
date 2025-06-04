import { CrudState } from "@core/models";
import * as MainServicesActions from"./main-service-configuration.actions"
import { StateUtil } from "@core/utils/state.util";
import { createReducer, on } from "@ngrx/store";

export const mainServicesFeatureKey = 'mainServices';

export interface MainServicesState extends CrudState {
  mainServicesList: any[];
  createMainServicesSuccess: any
  createMainServicesError: any
  updateMainServicesSuccess: any
  updateMainServicesError: any
  updateMainServicesPrioritySuccess: any
  updateMainServicesPriorityError: any
  mainServices: any
}

export const initialState: MainServicesState = {
  ...StateUtil.initiateCrudState(),
  mainServicesList: [],
  createMainServicesSuccess: null,
  createMainServicesError: null,
  updateMainServicesSuccess: null,
  updateMainServicesError: null,
  updateMainServicesPrioritySuccess: null,
  updateMainServicesPriorityError: null,
  mainServices: null
};

export const MainServicesReducer = createReducer(
  initialState,
  on(MainServicesActions.createMainServices, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    MainServicesActions.createMainServicesSuccess,
    (state, { success }) => ({
      ...state,
      createMainServicesSuccess: true,
      loading: false
    })
  ),
  on(
    MainServicesActions.createMainServicesFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createMainServicesError:error
    })
  ),
  on(MainServicesActions.searchMainServices, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    MainServicesActions.searchMainServicesSuccess,
    (state, { payload }) => ({
      ...state,
      mainServicesList: payload,
      total: payload.totalRecord,
      loading: false
    })
  ),
  on(
    MainServicesActions.searchMainServicesFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(MainServicesActions.updateMainServices, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    MainServicesActions.updateMainServicesSuccess,
    (state, { success }) => ({
      ...state,
     updateMainServicesSuccess: true,
      loading: false
    })
  ),
  on(
    MainServicesActions.updateMainServicesFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateMainServicesError: error
    })
  ),
  on(MainServicesActions.updateMainServicesPriority, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    MainServicesActions.updateMainServicesPrioritySuccess,
    (state, { success }) => ({
      ...state,
     updateMainServicesPrioritySuccess: true,
      loading: false
    })
  ),
  on(
    MainServicesActions.updateMainServicesPriorityFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateMainServicesPriorityError: error
    })
  ),
  on(MainServicesActions.findOneMainServices, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    MainServicesActions.findOneMainServicesSuccess,
    (state, { payload }) => ({
      ...state,
      mainServices: payload.data,
      loading: false
    })
  ),
  on(
    MainServicesActions.findOneMainServicesFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(
    MainServicesActions.clearStateCreateMainServices,
    (state, {  }) => ({
      ...state,
      createMainServicesSuccess: null
    })
  ), 
  on(
    MainServicesActions.clearStateCreateMainServicesError,
    (state, {  }) => ({
      ...state,
      createMainServicesError: null
    })
  ), 
   on(
    MainServicesActions.clearStateUpdateMainServices,
    (state, {  }) => ({
      ...state,
      updateMainServicesSuccess: null
    })
  ),

  on(
    MainServicesActions.clearStateUpdateMainServicesError,
    (state, {  }) => ({
      ...state,
      updateMainServicesError: null
    })
  ),
  on(
    MainServicesActions.clearStateUpdatePriorityServices,
    (state, {  }) => ({
      ...state,
      updateMainServicesPrioritySuccess: null
    })
  ),
  on(
    MainServicesActions.clearStateUpdatePriorityServicesError,
    (state, {  }) => ({
      ...state,
      updateMainServicesPriorityError: null
    })
  ),

)