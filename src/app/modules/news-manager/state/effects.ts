import {Injectable} from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as NewsManagerActions from './actions';
import { NewsManagerServices } from './service';
import { GetListNewsRequest } from '../models';

@Injectable()
export class NewsManagerEffects {

  constructor(
    private actions$: Actions,
    private newsManagerServices: NewsManagerServices,
  ) {
  }

  getListNews$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NewsManagerActions.getListNews),
      switchMap(({ payload }: {payload: GetListNewsRequest}) => {
        return this.newsManagerServices.getListNews(payload).pipe(
          map((res: any) =>
            NewsManagerActions.getListNewsSuccess(res)
          ),
          catchError((error) =>
            of(NewsManagerActions.getListNewsFail({ error }))
          )
        );
      })
    )
  );


}
