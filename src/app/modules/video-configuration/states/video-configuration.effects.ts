import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as VideosConfigActions from"./video-configuration.actions"
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';
import { VideoConfigurationService } from "../services/video-configuration.service";

@Injectable()
export class VideosConfigEffects {
  createVideosConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideosConfigActions.createVideosConfig),
      switchMap(({ payload }) =>
        this.videosConfigService.createVideosConfig({ ...payload }).pipe(
          map((res) =>
            VideosConfigActions.createVideosConfigSuccess({
              success: res
            })
          ),
          catchError((error) =>
            of(
              VideosConfigActions.createVideosConfigFail({
                error: error?.error
              })
            )
          )
        )
      )
    )
  );

  searchVideosConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(VideosConfigActions.searchVideosConfig),
      switchMap(({ payload }) =>
        this.videosConfigService.searchVideosConfigList(payload).pipe(
          map((res: any) =>
            VideosConfigActions.searchVideosConfigSuccess({
              payload: res
              
              
            })
          ),
          catchError((error) =>
            of(VideosConfigActions.searchVideosConfigFail({ error }))
          )
        )
      )
    )
  );

  updateVideosConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VideosConfigActions.updateVideosConfig),
      switchMap(({ id, payload }) =>
        this.videosConfigService.updateVideosConfig(id, payload).pipe(
          map((res) =>
            VideosConfigActions.updateVideosConfigSuccess({
              success: res
            })
          ),
          catchError((error) =>
            of(VideosConfigActions.updateVideosConfigFail({ error: error?.error }))
          )
        )
      )
    )
  );

  updateVideosConfigPriority$ = createEffect(() =>
  this.actions$.pipe(
    ofType(VideosConfigActions.updateVideosPriority),
    switchMap(({ payload }) =>
      this.videosConfigService.updateVideosConfigPriority( payload).pipe(
        map((res) =>
          VideosConfigActions.updateVideosPrioritySuccess({
            success: res
          })
        ),
        catchError((error) =>
          of(VideosConfigActions.updateVideosPriorityFail({ error: error?.error }))
        )
      )
    )
  )
);

updateVideosConfigPriorityMain$ = createEffect(() =>
this.actions$.pipe(
  ofType(VideosConfigActions.updateVideosPriorityMain),
  switchMap(({ payload }) =>
    this.videosConfigService.updateVideosConfigPriorityMain( payload).pipe(
      map((res) =>
        VideosConfigActions.updateVideosPriorityMainSuccess({
          success: res
        })
      ),
      catchError((error) =>
        of(VideosConfigActions.updateVideosPriorityMainFail({ error: error?.error }))
      )
    )
  )
)
);

  findOneVideosConfig = createEffect(() =>
    this.actions$.pipe(
      ofType(VideosConfigActions.findOneVideosConfig),
      switchMap(({ id }) =>
        this.videosConfigService.findOneVideosConfig(id).pipe(
          map((res: any) =>
            VideosConfigActions.findOneVideosConfigSuccess({
              payload: res
            })
          ),
          catchError((error) =>
            of(VideosConfigActions.findOneVideosConfigFail({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private videosConfigService: VideoConfigurationService
  ) {}
        }