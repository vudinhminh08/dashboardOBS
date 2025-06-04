import {createReducer, on} from "@ngrx/store";
import * as CategoriesConfigActions from "./actions";
import { ItemCategory, ItemCategoryDetailList } from '@modules/app-config/categories-config/models';
import * as RoleManagerActions from '@modules/user-role/role-manager/state/actions';
import { clearStateCategoryDetailList } from './actions';

export const categoriesConfigFeatureKey = 'categoriesConfig';

export interface CategoriesConfigState {
  categoriesList: {data: ItemCategory[], totalItem: number, loading: boolean, error: any},
  categoryDetailList: {data: ItemCategoryDetailList[], totalItem: number, loading: boolean, error: any},
  categoryChildByCode: {data: {type: string, items: ItemCategoryDetailList[]}[], loading: boolean, error: any},
  categoryToGetDetail: {data: ItemCategory},
}

const initialState: CategoriesConfigState = {
  categoriesList: {data: [], totalItem: 0, loading: false, error: null},
  categoryDetailList: {data: [], totalItem: 0, loading: false, error: null},
  categoryChildByCode: {data: [], loading: false, error: null},
  categoryToGetDetail: {data: {} as ItemCategory},
};

export const CategoriesConfigReducer = createReducer(
  initialState,

  on(CategoriesConfigActions.getListCategories, (state) => ({
    ...state,
    categoriesList: {...state.categoriesList, loading: true},
  })),
  on(CategoriesConfigActions.getListCategoriesSuccess, (state, res) => ({
    ...state,
    categoriesList: {
      ...state.categoriesList,
      loading: false,
      data: res.payload.content,
      totalItem: res.payload.totalElements,
    }, // res.payload là khi action dùng createHTTPActions thay vì dùng createAction
  })),
  on(CategoriesConfigActions.getListCategoriesFail, (state, {error}) => ({
    ...state,
    categoriesList: {...initialState.categoriesList, loading: false, error: error},
  })),
  on(CategoriesConfigActions.clearStateListCategories, (state) => ({
    ...state,
    categoriesList: initialState.categoriesList,
  })),


  // state get category detail table, display when click on item category list
  on(CategoriesConfigActions.setSelectCategoryToGetDetail, (state, {payload}) => ({
    ...state,
    categoryToGetDetail: {data: payload},
  })),
  on(CategoriesConfigActions.getCategoryDetailList, (state) => ({
    ...state,
    categoryDetailList: {...state.categoryDetailList, loading: true},
  })),
  on(CategoriesConfigActions.getCategoryDetailListSuccess, (state, res) => ({
    ...state,
    categoryDetailList: {
      ...state.categoryDetailList,
      loading: false,
      data: res.payload.content,
      totalItem: res.payload.totalElements,
    }, // res.payload là khi action dùng createHTTPActions thay vì dùng createAction
  })),
  on(CategoriesConfigActions.getCategoryDetailListFail, (state, {error}) => ({
    ...state,
    categoryDetailList: {...initialState.categoryDetailList, loading: false, error: error},
  })),
  on(CategoriesConfigActions.clearStateCategoryDetailList, (state) => ({
    ...state,
    categoryDetailList: initialState.categoryDetailList,
  })),
  // state get category detail table, display when click on item category list



  // state get category child by code
  on(CategoriesConfigActions.getCategoryChildByCode, (state) => ({
    ...state,
    categoryChildByCode: {...state.categoryChildByCode, loading: true},
  })),
  on(CategoriesConfigActions.getCategoryChildByCodeSuccess, (state, {payload}) => ({
    ...state,
    categoryChildByCode: {
      ...state.categoryChildByCode,
      loading: false,
      data: [
        ...state.categoryChildByCode.data,
        {
          type: payload.globalCode,
          items: payload.dataRes
        }
      ]
    },
  })),
  on(CategoriesConfigActions.getCategoryChildByCodeFail, (state, {error}) => ({
    ...state,
    categoryChildByCode: {...state.categoryChildByCode, loading: false, error: error},
  })),
  on(CategoriesConfigActions.clearStateCategoryChildByCode, (state) => ({
    ...state,
    categoryChildByCode: initialState.categoryChildByCode,
  })),
  // state get category child by code


)
