import { CrudState } from "@core/models";
import { StateUtil } from "@core/utils/state.util";
import * as ServiceConfigActions from"../state/service-config.actions"
import { createReducer, on } from "@ngrx/store";

export const serviceConfigFeatureKey = 'serviceConfig';

export interface ServiceConfigState extends CrudState {
  globalList: any[];
  serviceConfigList: any[];
  createServiceConfigSuccess: any
  createServiceConfigError: any
  updateServiceConfigSuccess: any
  updateServiceConfigError: any
  serviceConfig: any
  serviceGroupConfig: any
  updateServiceConfigPriority: any
  updateServiceConfigPrioritySuccess: any
  updateServiceConfigPriorityError: any
  updateServicesPriorityMainSuccess: any
  updateServicesPriorityMainError: any

}

export const initialState: ServiceConfigState = {
  ...StateUtil.initiateCrudState(),
  globalList:[],
  serviceConfigList: [],
  createServiceConfigSuccess: null,
  createServiceConfigError: null,
  updateServiceConfigSuccess: null,
  updateServiceConfigError: null,
  serviceConfig: null,
  serviceGroupConfig: null,
  updateServiceConfigPriority: null,
  updateServiceConfigPrioritySuccess: null,
  updateServiceConfigPriorityError: null,
  updateServicesPriorityMainSuccess: null,
  updateServicesPriorityMainError: null,


};

export const ServiceConfigReducer = createReducer(
  initialState,
  on(ServiceConfigActions.createServiceConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.createServiceConfigSuccess,
    (state, { success }) => ({
      ...state,
      createServiceConfigSuccess: true,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.createServiceConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createServiceConfigError:error
    })
  ),
  on(ServiceConfigActions.searchServiceConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.searchServiceConfigSuccess,
    (state, { payload }) => ({
      ...state,
      serviceConfigList: payload,
      total: payload.totalRecord,
      loading: false
    })
  ),

  on(ServiceConfigActions.getGlobalListService, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.getGlobalListServiceSuccess,
    (state, { payload }) => ({
      ...state,
      globalList: payload.data,
      total: payload.totalRecord,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.searchServiceConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(ServiceConfigActions.updateServiceConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.updateServiceConfigSuccess,
    (state, { success }) => ({
      ...state,
     updateServiceConfigSuccess: true,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.updateServiceConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateServiceConfigError: error
    })
  ),

  on(ServiceConfigActions.updateServicePriorityConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.updateServicePriorityConfigSuccess,
    (state, { success }) => ({
      ...state,
     updateServiceConfigPrioritySuccess: true,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.updateServicePriorityConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateServiceConfigPriorityError: error
    })
  ),
  on(ServiceConfigActions.updateServicesPriorityMain, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.updateServicesPriorityMainSuccess,
    (state, { success }) => ({
      ...state,
     updateServiceConfigPrioritySuccess: true,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.updateServicesPriorityMainFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateServiceConfigPriorityError: error
    })
  ),
  on(ServiceConfigActions.findOneServiceConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.findOneServiceConfigSuccess,
    (state, { payload }) => ({
      ...state,
      serviceConfig: payload.data,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.findOneServiceConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  ///

  on(ServiceConfigActions.createServiceGroupConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.createServiceGroupConfigSuccess,
    (state, { success }) => ({
      ...state,
      createServiceGroupConfigSuccess: success,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.createServiceGroupConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createServiceGroupConfigError:error
    })
  ),
  // on(ServiceConfigActions.searchServiceGroupConfig, (state, _) => ({
  //   ...state,
  //   loading: true
  // })),
  // on(
  //   ServiceConfigActions.searchServiceGroupConfigSuccess,
  //   (state, { payload }) => ({
  //     ...state,
  //     serviceGroupConfigList: payload.data,
  //     total: payload.totalRecord,
  //     loading: false
  //   })
  // ),
  // on(
  //   ServiceConfigActions.searchServiceGroupConfigFail,
  //   (state, { error }) => ({
  //     ...state,
  //     loading: false,
  //     error
  //   })
  // ),
  on(ServiceConfigActions.updateServiceGroupConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.updateServiceGroupConfigSuccess,
    (state, { success }) => ({
      ...state,
     updateServiceGroupConfigSuccess: success,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.updateServiceGroupConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateServiceGroupConfigError: error
    })
  ),
  on(ServiceConfigActions.findOneServiceGroupConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ServiceConfigActions.findOneServiceGroupConfigSuccess,
    (state, { success }) => ({
      ...state,
      serviceGroupConfig: success,
      loading: false
    })
  ),
  on(
    ServiceConfigActions.findOneServiceGroupConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(
    ServiceConfigActions.clearStateCreateServiceGroup,
    (state, {  }) => ({
      ...state,
      createServiceConfigSuccess: false
    })
  ),  
  on(
    ServiceConfigActions.clearStateCreateServiceFeild,
    (state, {  }) => ({
      ...state,
      createServiceConfigError: null
    })
  ), 
  on(
    ServiceConfigActions.clearStateUpdateService,
    (state, {  }) => ({
      ...state,
      updateServiceConfigSuccess: false
    })
  ),
  on(
    ServiceConfigActions.clearStateUpdateServiceError,
    (state, {  }) => ({
      ...state,
      updateServiceConfigError: null
    })
  ),
  on(
    ServiceConfigActions.clearStateUpdatePriorityServices,
    (state, {  }) => ({
      ...state,
      updateServiceConfigPrioritySuccess: false
    })
  ),

  on(
    ServiceConfigActions.clearStateUpdatePriorityMainService,
    (state, {  }) => ({
      ...state,
      updateServicesPriorityMainSuccess: false
    })
  ),

  on(
    ServiceConfigActions.clearStateUpdatePriorityMainServiceError,
    (state, {  }) => ({
      ...state,
      updateServicesPriorityMainError: null
    })
  ),

)