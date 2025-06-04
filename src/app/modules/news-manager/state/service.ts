import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseCrudApiService } from '@core/services';
import {
  ApproveArticlePostRequest,
  GetListNewsRequest,
  ItemNewsResponsed,
  SaveNewsItemRequest,
  UpdateArticleStatusRequest, UpdatePositionPostRequest
} from '../models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class NewsManagerServices extends BaseCrudApiService {



  getListNews(queryParams: GetListNewsRequest): Observable<any> {
    const url = this.buildUrl('/news/search-news');
    return this.http.post<ResponseModel<any[]>>(url, null,{
      params: {...queryParams}
    });
  }


  saveArticlePost(bodyRequest: SaveNewsItemRequest): Observable<any>{

    const apiPath: string = bodyRequest?.id ? `/news/update-news/${bodyRequest.id}` : '/news/create-news';
    const method: 'put' | 'post' = bodyRequest?.id ? 'put' : 'post'

    const url = this.buildUrl(apiPath);
    return this.http[method]<ResponseModel<any>>(url, bodyRequest);
  }


  getDetailArticlePost(articleId: string){
    const url = this.buildUrl(`/news/get-news/${articleId}`);
    return this.http.get<ItemNewsResponsed>(url);
  }


  approveArticlePost(bodyRequest: ApproveArticlePostRequest){
    const url = this.buildUrl(`/news/approve-news`);
    return this.http.put(url, bodyRequest, {
      responseType: 'text'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError({error: JSON.parse(error.error)});
      })
    );
  }


  updateArticleStatus(bodyRequest: UpdateArticleStatusRequest){
    const url = this.buildUrl(`/news/update-news-status`);
    return this.http.put(url, bodyRequest, {
      responseType: 'text'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError({error: JSON.parse(error.error)});
      })
    );
  }


  updatePositionPost(bodyRequest: UpdatePositionPostRequest){
    const url = this.buildUrl(`/news/change-news-priority`);
    return this.http.put(url, bodyRequest, {
      responseType: 'text'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError({error: JSON.parse(error.error)});
      })
    );
  }




}
