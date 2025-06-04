import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as MainServicesActions from"./main-service-configuration.actions"
import { catchError, map, mergeMap, of } from "rxjs";
import { MainServiceConfigurationService } from "../services/main-service-configuration.service";

@Injectable()
export class MainServicesEffects {
  createMainServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MainServicesActions.createMainServices),
      mergeMap(({ payload }) =>
        this.mainServicesService.createMainServices({ ...payload }).pipe(
          map((res) =>
            MainServicesActions.createMainServicesSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(
              MainServicesActions.createMainServicesFail({
                error: error?.error
              })
            )
          )
        )
      )
    )
  );

  findTreatmentFaculties = createEffect(() =>
    this.actions$.pipe(
      ofType(MainServicesActions.searchMainServices),
      mergeMap(({ payload }) =>
        this.mainServicesService.searchMainServicesList(payload).pipe(
          map((res: any) =>
            MainServicesActions.searchMainServicesSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(MainServicesActions.searchMainServicesFail({ error: error?.error }))
          )
        )
      )
    )
  );

  updateMainServices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MainServicesActions.updateMainServices),
      mergeMap(({ payload }) =>
        this.mainServicesService.updateMainServices( payload).pipe(
          map((res) =>
            MainServicesActions.updateMainServicesSuccess({
              success: res.data
            })
          ),
          catchError((error) =>
            of(MainServicesActions.updateMainServicesFail({ error: error?.error }))
          )
        )
      )
    )
  );

  updateMainServicesPriority$ = createEffect(() =>
  this.actions$.pipe(
    ofType(MainServicesActions.updateMainServicesPriority),
    mergeMap(({ payload }) =>
      this.mainServicesService.updateMainServicePriority( payload).pipe(
        map((res) =>
          MainServicesActions.updateMainServicesPrioritySuccess({
            success: res.data
          })
        ),
        catchError((error) =>
          of(MainServicesActions.updateMainServicesPriorityFail({ error: error?.error }))
        )
      )
    )
  )
);



  findOneMainServices = createEffect(() =>
    this.actions$.pipe(
      ofType(MainServicesActions.findOneMainServices),
      mergeMap(({ id }) =>
        this.mainServicesService.findOneMainServices(id).pipe(
          map((res: any) =>
            MainServicesActions.findOneMainServicesSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(MainServicesActions.findOneMainServicesFail({ error: error?.error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private mainServicesService: MainServiceConfigurationService
  ) {}
        }