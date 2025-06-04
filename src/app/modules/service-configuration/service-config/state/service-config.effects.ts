import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ServiceConfigActions from"../state/service-config.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { ServiceConfigService } from "../services/service-config.service";
@Injectable()
export class ServiceConfigEffects {
  createServiceConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceConfigActions.createServiceConfig),
      mergeMap(({ payload }) =>
        this.configService.createServiceConfig({ ...payload }).pipe(
          map((res) =>
            ServiceConfigActions.createServiceConfigSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(
              ServiceConfigActions.createServiceConfigFail({
                error: error?.error
              })
            )
          )
        )
      )
    )
  );

  
  getGlobalList = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceConfigActions.getGlobalListService),
      mergeMap(({ payload }) =>
        this.configService.getGlobalListService(payload).pipe(
          map((res: any) =>
            ServiceConfigActions.getGlobalListServiceSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(ServiceConfigActions.getGlobalListServiceFail({ error: error?.error }))
          )
        )
      )
    )
  );

  findServiceConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceConfigActions.searchServiceConfig),
      mergeMap(({ payload }) =>
        this.configService.searchServiceConfigList(payload).pipe(
          map((res: any) =>
            ServiceConfigActions.searchServiceConfigSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(ServiceConfigActions.searchServiceConfigFail({ error: error?.error }))
          )
        )
      )
    )
  );

  updateServiceConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceConfigActions.updateServiceConfig),
      mergeMap(({  payload }) =>
        this.configService.updateServiceConfig(payload).pipe(
          map((res) =>
            ServiceConfigActions.updateServiceConfigSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(ServiceConfigActions.updateServiceConfigFail({ error: error?.error }))
          )
        )
      )
    )
  );


  updateServiceConfigPriority$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ServiceConfigActions.updateServicePriorityConfig),
    mergeMap(({  payload }) =>
      this.configService.updateServiceConfigPriority(payload).pipe(
        map((res) =>
          ServiceConfigActions.updateServicePriorityConfigSuccess({
            success: res.data
          })
        ),
        catchError((error) =>
          of(ServiceConfigActions.updateServicePriorityConfigFail({ error: error?.error }))
        )
      )
    )
  )
);

updateServicesPriorityMain$ = createEffect(() =>
this.actions$.pipe(
  ofType(ServiceConfigActions.updateServicesPriorityMain),
  mergeMap(({ payload }) =>
    this.configService.updateServiceConfigPriorityMain( payload).pipe(
      map((res) =>
        ServiceConfigActions.updateServicesPriorityMainSuccess({
          success: res.data
        })
      ),
      catchError((error) =>
        of(ServiceConfigActions.updateServicesPriorityMainFail({ error: error?.error }))
      )
    )
  )
)
);

  findOneServiceConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceConfigActions.findOneServiceGroupConfig),
      mergeMap(({ payload }) =>
        this.configService.findOneServiceConfig(payload).pipe(
          map((res: any) =>
            ServiceConfigActions.findOneServiceGroupConfigSuccess({
              success: res
            })
          ),
          catchError((error) =>
            of(ServiceConfigActions.findOneServiceGroupConfigFail({ error }))
          )
        )
      )
    )
  );

  createServiceGroupConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ServiceConfigActions.createServiceGroupConfig),
      mergeMap(({ payload }) =>
        this.configService.createServiceConfig({ ...payload }).pipe(
          map((res) =>
            ServiceConfigActions.createServiceGroupConfigSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(
              ServiceConfigActions.createServiceGroupConfigFail({
                error: error?.error
              })
            )
          )
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private configService: ServiceConfigService
  ) {}
        }