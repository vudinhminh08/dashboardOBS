import { CrudState } from "@core/models";
import { StateUtil } from "@core/utils/state.util";
import * as ConfigFieldActions from"../state/config-field.actions"
import { createReducer, on } from "@ngrx/store";

export const configFieldFeatureKey = 'configField';

export interface ConfigFieldState extends CrudState {
  configFieldList: any[];
  createConfigfieldSuccess: any
  createConfigfieldError: any
  updateConfigfieldSuccess: any
  updateConfigfieldError: any
  configField: any
  serviceGroupConfigList: any[];
  createServiceGroupConfigSuccess: any
  createServiceGroupConfigError: any
  updateServiceGroupConfigSuccess: any
  updateServiceGroupConfigError: any

  updateServiceGroupPrioritySuccess: any
  updateServiceGroupPriorityError: any

  updateConfigFieldPrioritySuccess: any
  updateConfigFieldPriorityError: any
  serviceGroupConfig: any
}

export const initialState: ConfigFieldState = {
  ...StateUtil.initiateCrudState(),
  configFieldList: [],
  createConfigfieldSuccess: null,
  createConfigfieldError: null,
  updateConfigfieldSuccess: null,
  updateConfigfieldError: null,
  configField: null,
  serviceGroupConfigList: [],
  createServiceGroupConfigSuccess: null,
  createServiceGroupConfigError: null,
  updateServiceGroupConfigSuccess: null,
  updateServiceGroupConfigError: null,
  updateServiceGroupPrioritySuccess: null,
  updateServiceGroupPriorityError: null,
  updateConfigFieldPrioritySuccess: null,
  updateConfigFieldPriorityError: null,
  serviceGroupConfig: null

};

export const ConfigFieldReducer = createReducer(
  initialState,
  on(ConfigFieldActions.createConfigField, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.createConfigFieldSuccess,
    (state, { success }) => ({
      ...state,
      createConfigfieldSuccess: true,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.createConfigFieldFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createConfigfieldError:error
    })
  ),
  on(ConfigFieldActions.searchConfigField, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.searchConfigFieldSuccess,
    (state, { param }) => ({
      ...state,
      configFieldList: param,
      total: param.totalRecord,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.searchConfigFieldFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(ConfigFieldActions.updateConfigField, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.updateConfigFieldSuccess,
    (state, { success }) => ({
      ...state,
     updateConfigfieldSuccess: true,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.updateConfigFieldFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateConfigfieldError: error
    })
  ),
  on(ConfigFieldActions.updateConfigFieldPriority, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.updateConfigFieldPrioritySuccess,
    (state, { success }) => ({
      ...state,
     updateConfigFieldPrioritySuccess: true,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.updateConfigFieldPriorityFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateConfigFieldPriorityError: error
    })
  ),
  on(ConfigFieldActions.updateServiceGroupPriority, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.updateServiceGroupPrioritySuccess,
    (state, { success }) => ({
      ...state,
     updateServiceGroupPrioritySuccess: true,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.updateServiceGroupPriorityFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateServiceGroupPriorityError: error
    })
  ),
  on(ConfigFieldActions.findOneConfigField, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.findOneConfigFieldSuccess,
    (state, { payload }) => ({
      ...state,
      configField: payload.data,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.findOneConfigFieldFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(ConfigFieldActions.createServiceGroupConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.createServiceGroupConfigSuccess,
    (state, { success }) => ({
      ...state,
      createServiceGroupConfigSuccess: true,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.createServiceGroupConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      createServiceGroupConfigError:error
    })
  ),
  on(ConfigFieldActions.searchServiceGroupConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.searchServiceGroupConfigSuccess,
    (state, { payload }) => ({
      ...state,
      serviceGroupConfigList: payload,
      total: payload.totalRecord,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.searchServiceGroupConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),
  on(ConfigFieldActions.updateServiceGroupConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.updateServiceGroupConfigSuccess,
    (state, { success }) => ({
      ...state,
     updateServiceGroupConfigSuccess: true,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.updateServiceGroupConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
     updateServiceGroupConfigError: error
    })
  ),
  on(ConfigFieldActions.findOneServiceGroupConfig, (state, _) => ({
    ...state,
    loading: true
  })),
  on(
    ConfigFieldActions.findOneServiceGroupConfigSuccess,
    (state, { payload }) => ({
      ...state,
      serviceGroupConfig: payload.data,
      loading: false
    })
  ),
  on(
    ConfigFieldActions.findOneServiceGroupConfigFail,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(
    ConfigFieldActions.clearStateCreateConfigField,
    (state, {  }) => ({
      ...state,
      createConfigfieldSuccess: false
    })
  ), 
  on(
    ConfigFieldActions.clearStateCreateConfigFieldError,
    (state, {  }) => ({
      ...state,
      createConfigfieldError: null
    })
  ),
   on(
    ConfigFieldActions.clearStateCreateGroupService,
    (state, {  }) => ({
      ...state,
      createServiceGroupConfigSuccess: false
    })
  ), 
  on(
    ConfigFieldActions.clearStateCreateGroupServiceError,
    (state, {  }) => ({
      ...state,
      createServiceGroupConfigError: null
    })
  ), 
   on(
    ConfigFieldActions.clearStateUpdateConfigField,
    (state, {  }) => ({
      ...state,
      updateConfigfieldSuccess: false
    })
  ),  
  on(
    ConfigFieldActions.clearStateUpdateConfigFieldError,
    (state, {  }) => ({
      ...state,
      updateConfigfieldError: null
    })
  ),  
  
  on(
    ConfigFieldActions.clearStateUpdateGroupService,
    (state, { }) => ({
      ...state,
      updateServiceGroupConfigSuccess: false
    })
  ),
  on(
    ConfigFieldActions.clearStateUpdateGroupServiceError,
    (state, { }) => ({
      ...state,
      updateServiceGroupConfigError: null
    })
  ),

  on(
    ConfigFieldActions.clearStateUpdateConfigFieldPrioritySuccess,
    (state, {  }) => ({
      ...state,
      updateConfigFieldPrioritySuccess: false
    })
  ),  
  on(
    ConfigFieldActions.clearStateUpdateConfigFieldPriorityError,
    (state, {  }) => ({
      ...state,
      updateConfigFieldPriorityError: null
    })
  ),  
  on(
    ConfigFieldActions.clearStateUpdateGroupServicePrioritySuccess,
    (state, { }) => ({
      ...state,
      updateServiceGroupPrioritySuccess: false
    })
  ),
  on(
    ConfigFieldActions.clearStateUpdateGroupServicePriorityError,
    (state, { }) => ({
      ...state,
      updateServiceGroupPriorityError: null
    })
  ),
)