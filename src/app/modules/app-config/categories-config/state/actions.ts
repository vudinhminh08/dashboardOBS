import {createAction, props} from "@ngrx/store";
import { createHTTPActions } from '@core/utils/state.util';
import {
  GetCategoryDetailRequest,
  GetListCategoriesRequest,
  ItemCategory, ItemCategoryDetailList
} from '@modules/app-config/categories-config/models';


export const [
  getListCategories,
  getListCategoriesSuccess,
  getListCategoriesFail
] = createHTTPActions<GetListCategoriesRequest, any, any>(
  '[CategoriesConfig] Get List Categories');
export const clearStateListCategories = createAction('[CategoriesConfig] Clear State List Categories');


export const setSelectCategoryToGetDetail = createAction(
  '[CategoriesConfig] Set Select Category To Get Detail List',
  props<{ payload: ItemCategory }>()
);


export const [
  getCategoryDetailList,
  getCategoryDetailListSuccess,
  getCategoryDetailListFail
] = createHTTPActions<GetCategoryDetailRequest, any, any>(
  '[CategoriesConfig] Get Category Detail List');
export const clearStateCategoryDetailList = createAction('[CategoriesConfig] Clear State Category Detail List');





export const [
  getCategoryChildByCode,
  getCategoryChildByCodeSuccess,
  getCategoryChildByCodeFail
] = createHTTPActions<{globalCode: string}, {dataRes: ItemCategoryDetailList[], globalCode: string}, any>(
  '[CategoriesConfig] Get Category Child By Code');
export const clearStateCategoryChildByCode = createAction('[CategoriesConfig] Clear State Category Child By Code');






