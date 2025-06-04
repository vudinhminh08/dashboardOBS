import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseApiService } from '@core/services';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class ProductConfigurationService extends BaseApiService {
  protected override endpoint = `${environment.serverUrl.baseUrl}`;

  searchProductConfigurationList(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/search`,
      body
    );
  }


  createProductConfiguration(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/search`,
      body
    );
  }

  updateProductConfiguration(id: any,body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/search`,
      { id, ...body }
    );
  }

  findOneProductConfiguration(id: any) {
    return this.http.get<ResponseModel<any[]>>( `${this.endpoint}/${id}`);
  }

}
