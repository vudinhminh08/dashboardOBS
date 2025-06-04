import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CategoriesConfigActions from './actions';
import { CategoriesConfigServices } from './service';
import { ItemCategoryDetailList } from '@modules/app-config/categories-config/models';

@Injectable()
export class CategoriesConfigEffects {

  constructor(
    private actions$: Actions,
    private categoriesConfigServices: CategoriesConfigServices,
  ) {
  }

  getListCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesConfigActions.getListCategories),
      switchMap(({ payload }) => {
        return this.categoriesConfigServices.getListCategories(payload).pipe(
          map((res: any) =>
            CategoriesConfigActions.getListCategoriesSuccess(res)
          ),
          catchError((error) =>
            of(CategoriesConfigActions.getListCategoriesFail({ error }))
          )
        );
      })
    )
  );

  getCategoryDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesConfigActions.getCategoryDetailList),
      switchMap(({ payload }) => {
        return this.categoriesConfigServices.getDetailCategory(payload).pipe(
          map((res: any) =>
            CategoriesConfigActions.getCategoryDetailListSuccess(res)
          ),
          catchError((error) =>
            of(CategoriesConfigActions.getCategoryDetailListFail({ error }))
          )
        );
      })
    )
  );


  getCategoryChildByCode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesConfigActions.getCategoryChildByCode),
      mergeMap(({ payload }) => {
        return this.categoriesConfigServices.getCategoryDetailItemByCode(payload.globalCode).pipe(
          map((res: ItemCategoryDetailList[]) =>
            CategoriesConfigActions.getCategoryChildByCodeSuccess({dataRes: res, globalCode: payload.globalCode})
          ),
          catchError((error) =>
            of(CategoriesConfigActions.getCategoryChildByCodeFail({ error }))
          )
        );
      })
    )
  );

}
