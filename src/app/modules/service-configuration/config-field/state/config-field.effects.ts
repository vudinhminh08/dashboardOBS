import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as ConfigFieldActions from"../state/config-field.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { ConfigFeildService } from "../services/config-field.service";
@Injectable()
export class ConfigFieldEffects {
  createConfigField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigFieldActions.createConfigField),
      mergeMap(({ payload }) =>
        this.configFieldService.createConfigField({ ...payload }).pipe(
          map((res) =>
            ConfigFieldActions.createConfigFieldSuccess({
              success: res
            })
          ),
          catchError((error) =>
            of(
              ConfigFieldActions.createConfigFieldFail({
                error: error?.error
              })
            )
          )
        )
      )
    )
  );

  findConfigField = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigFieldActions.searchConfigField),
      mergeMap(({ param }) =>
        this.configFieldService.searchConfigFieldList(param).pipe(
          map((res: any) =>
            ConfigFieldActions.searchConfigFieldSuccess({
              param: res
            })
          ),
          catchError((error) =>
            of(ConfigFieldActions.searchConfigFieldFail({ error: error?.error }))
          )
        )
      )
    )
  );

  updateConfigField$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigFieldActions.updateConfigField),
      mergeMap(({  payload }) =>
        this.configFieldService.updateConfigField( payload).pipe(
          map((res) =>
            ConfigFieldActions.updateConfigFieldSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(ConfigFieldActions.updateConfigFieldFail({ error: error?.error }))
          )
        )
      )
    )
  );

  findOneConfigField = createEffect(() =>
    this.actions$.pipe(
      ofType(ConfigFieldActions.findOneConfigField),
      mergeMap(({ id }) =>
        this.configFieldService.findOneConfigField(id).pipe(
          map((res: any) =>
            ConfigFieldActions.findOneConfigFieldSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(ConfigFieldActions.findOneConfigFieldFail({ error }))
          )
        )
      )
    )
  );


  createServiceGroup$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ConfigFieldActions.createServiceGroupConfig),
    mergeMap(({ payload }) =>
      this.configFieldService.createServiceGroupConfig({ ...payload }).pipe(
        map((res) =>
          ConfigFieldActions.createServiceGroupConfigSuccess({
            success: res.data
          })
        ),
        catchError((error) =>
          of(
            ConfigFieldActions.createServiceGroupConfigFail({
              error: error?.error
            })
          )
        )
      )
    )
  )
);


  findServiceGroupConfig = createEffect(() =>
  this.actions$.pipe(
    ofType(ConfigFieldActions.searchServiceGroupConfig),
    mergeMap(({ payload }) =>
      this.configFieldService.searchServiceGroupConfigList(payload).pipe(
        map((res: any) =>
          ConfigFieldActions.searchServiceGroupConfigSuccess({
            payload: res
          })
        ),
        catchError((error) =>
          of(ConfigFieldActions.searchServiceGroupConfigFail({ error: error?.error }))
        )
      )
    )
  )
);

updateServiceGroupConfig$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ConfigFieldActions.updateServiceGroupConfig),
    mergeMap(({ id, payload }) =>
      this.configFieldService.updateServiceGroupConfig(id, payload).pipe(
        map((res) =>
          ConfigFieldActions.updateServiceGroupConfigSuccess({
            success: res.data
          })
        ),
        catchError((error) =>
          of(ConfigFieldActions.updateServiceGroupConfigFail({ error: error?.error }))
        )
      )
    )
  )
);

findOneServiceGroupConfig = createEffect(() =>
  this.actions$.pipe(
    ofType(ConfigFieldActions.findOneServiceGroupConfig),
    mergeMap(({ id }) =>
      this.configFieldService.findOneServiceGroupConfig(id).pipe(
        map((res: any) =>
          ConfigFieldActions.findOneServiceGroupConfigSuccess({
            payload: res
          })
        ),
        catchError((error) =>
          of(ConfigFieldActions.findOneServiceGroupConfigFail({ error: error?.error }))
        )
      )
    )
  )
);

updateServiceGroupPriority$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ConfigFieldActions.updateServiceGroupPriority),
    mergeMap(({ payload }) =>
      this.configFieldService.updateServiceGroupPriority( payload).pipe(
        map((res) =>
          ConfigFieldActions.updateServiceGroupPrioritySuccess({
            success: res.data
          })
        ),
        catchError((error) =>
          of(ConfigFieldActions.updateServiceGroupPriorityFail({ error: error?.error }))
        )
      )
    )
  )
);

updateConfigFieldPriority$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ConfigFieldActions.updateConfigFieldPriority),
    mergeMap(({ payload }) =>
      this.configFieldService.updateConfigFieldPriority( payload).pipe(
        map((res) =>
          ConfigFieldActions.updateConfigFieldPrioritySuccess({
            success: res.data
          })
        ),
        catchError((error) =>
          of(ConfigFieldActions.updateConfigFieldPriorityFail({ error: error?.error }))
        )
      )
    )
  )
);

  constructor(
    private actions$: Actions,
    private configFieldService: ConfigFeildService
  ) {}
        }