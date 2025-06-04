import {createFeatureSelector, createSelector} from "@ngrx/store";
import { categoriesConfigFeatureKey, CategoriesConfigState } from './reducer';
import { selectRoleState } from '@modules/user-role/role-manager/state/selectors';
import { ItemCategoryDetailList } from '@modules/app-config/categories-config/models';
import { OptionModel } from '@core/models';

export const selectCategoriesState =
  createFeatureSelector<CategoriesConfigState>(categoriesConfigFeatureKey);


export const selectDataListCategories = createSelector(
  selectCategoriesState, (state) => state.categoriesList.data
);
export const selectLoadingListCategories = createSelector(
  selectCategoriesState, (state) => state.categoriesList.loading
);
export const selectTotalListCategories = createSelector(
  selectCategoriesState, (state) => state.categoriesList.totalItem
);


export const selectCategoryToGetDetail = createSelector(
  selectCategoriesState, (state) => state.categoryToGetDetail.data
);
export const selectDataDetailListCategory = createSelector(
  selectCategoriesState, (state) => state.categoryDetailList.data
);
export const selectLoadingDetailListCategory = createSelector(
  selectCategoriesState, (state) => state.categoryDetailList.loading
);
export const selectTotalDetailListCategory = createSelector(
  selectCategoriesState, (state) => state.categoryDetailList.totalItem
);


export const selectOptionCategoryChildByCode = (type: string) => createSelector(
  selectCategoriesState, (state) => {

    const selectedList = state.categoryChildByCode?.data?.find(item => item.type == type);

    const options: OptionModel<number>[] = selectedList?.items?.map((item: ItemCategoryDetailList) => {
      return {
        ...item,
        label: item.name,
        value: item.id
      }
    }) || [];

    return options
  }
);





















