import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ProductConfigurationActions from"../state/product-configuration.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { ProductConfigurationService } from "../services/product-configuration.service";
@Injectable()
export class ProductConfigurationEffects {
  createProductConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductConfigurationActions.createProductConfiguration),
      mergeMap(({ payload }) =>
        this.productConfigurationService.createProductConfiguration({ ...payload }).pipe(
          map((res) =>
            ProductConfigurationActions.createProductConfigurationSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(
              ProductConfigurationActions.createProductConfigurationFail({
                error: error.error.error
              })
            )
          )
        )
      )
    )
  );

  findProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductConfigurationActions.searchProductConfiguration),
      mergeMap(({ payload }) =>
        this.productConfigurationService.searchProductConfigurationList(payload).pipe(
          map((res: any) =>
            ProductConfigurationActions.searchProductConfigurationSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(ProductConfigurationActions.searchProductConfigurationFail({ error }))
          )
        )
      )
    )
  );

  updateProductConfiguration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductConfigurationActions.updateProductConfiguration),
      mergeMap(({ id, payload }) =>
        this.productConfigurationService.updateProductConfiguration(id, payload).pipe(
          map((res) =>
            ProductConfigurationActions.updateProductConfigurationSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(ProductConfigurationActions.updateProductConfigurationFail({ error }))
          )
        )
      )
    )
  );

  findOneProductConfiguration = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductConfigurationActions.findOneProductConfiguration),
      mergeMap(({ id }) =>
        this.productConfigurationService.findOneProductConfiguration(id).pipe(
          map((res: any) =>
            ProductConfigurationActions.findOneProductConfigurationSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(ProductConfigurationActions.findOneProductConfigurationFail({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productConfigurationService: ProductConfigurationService
  ) {}
        }