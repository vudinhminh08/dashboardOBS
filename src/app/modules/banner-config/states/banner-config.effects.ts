import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as BannerConfigActions from"./banner-config.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { BannerConfigService } from "../services/banner-config.service";

@Injectable()
export class BannerConfigEffects {
  createBannerConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BannerConfigActions.createBannerConfig),
      mergeMap(({ payload }) =>
        this.bannerConfigService.createBannerConfig({ ...payload }).pipe(
          map((res) =>
            BannerConfigActions.createBannerConfigSuccess({
              success: res
            })
          ),
          catchError((error) =>
            of(
              BannerConfigActions.createBannerConfigFail({
                error: error?.error
              })
            )
          )
        )
      )
    )
  );

  searchBannerConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(BannerConfigActions.searchBannerConfig),
      mergeMap(({ payload }) =>
        this.bannerConfigService.searchBannerConfigList(payload).pipe(
          map((res: any) =>
            BannerConfigActions.searchBannerConfigSuccess({
              payload: res
              
              
            })
          ),
          catchError((error) =>
            of(BannerConfigActions.searchBannerConfigFail({ error: error?.error }))
          )
        )
      )
    )
  );

  updateBannerConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BannerConfigActions.updateBannerConfig),
      mergeMap(({ id, payload }) =>
        this.bannerConfigService.updateBannerConfig(id, payload).pipe(
          map((res) =>
            BannerConfigActions.updateBannerConfigSuccess({
              success: res
            })
          ),
          catchError((error) =>
            of(BannerConfigActions.updateBannerConfigFail({ error: error?.error }))
          )
        )
      )
    )
  );

  findOneBannerConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(BannerConfigActions.findOneBannerConfig),
      mergeMap(({ payload }) =>
        this.bannerConfigService.findOneBannerConfig(payload).pipe(
          map((res: any) =>
            BannerConfigActions.findOneBannerConfigSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(BannerConfigActions.findOneBannerConfigFail({ error: error?.error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bannerConfigService: BannerConfigService
  ) {}
        }