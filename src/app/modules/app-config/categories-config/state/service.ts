import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseCrudApiService } from '@core/services';
import {
  GetCategoryDetailRequest,
  GetListCategoriesRequest,
  ItemCategory, ItemCategoryDetailList, SaveCategoryDetailValueItemRequest,
  SaveCategoryRequest
} from '@modules/app-config/categories-config/models';
import { Observable } from 'rxjs';

@Injectable()
export class CategoriesConfigServices extends BaseCrudApiService {


  getListCategories(params: GetListCategoriesRequest) {

    const url = this.buildUrl('/globalList');
    return this.http.get<ResponseModel<any[]>>(url,{
      params: {...params}
      }
    );
  }

  saveCategoryItem(bodyRequest: SaveCategoryRequest):  Observable<any>{
    const apiPath = bodyRequest?.id ? `/globalList/${bodyRequest?.id}` : '/globalList';
    const method: string = bodyRequest?.id ? 'put' : 'post';

    const url = this.buildUrl(apiPath);
    return this.http[method]<ResponseModel<any>>(url, bodyRequest);
  }

  getDetailCategoryById(categoryId : number): Observable<ItemCategory>{
    const url = this.buildUrl(`/globalList/${categoryId}`);
    return this.http.get<ItemCategory>(url);
  }

  getDetailCategory(params: GetCategoryDetailRequest) {

    const url = this.buildUrl('/globalListDetail');
    return this.http.get<ResponseModel<any[]>>(url,{
        params: {...params}
      }
    );
  }


  saveCategoryDetailItemValue(bodyRequest: SaveCategoryDetailValueItemRequest):  Observable<any>{
    const apiPath = bodyRequest?.id ? `/globalListDetail/${bodyRequest?.id}` : '/globalListDetail';
    const method: string = bodyRequest?.id ? 'put' : 'post';

    const url = this.buildUrl(apiPath);
    return this.http[method]<ResponseModel<any>>(url, bodyRequest);
  }


  getCategoryDetailItemByCode(globalCode: string) {

    const url = this.buildUrl('/globalListDetail/getByGlobalListCode');
    return this.http.get<ItemCategoryDetailList[]>(url,{
        params: {globalCode}
      }
    );
  }



}
