import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseApiService } from '@core/services';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class BannerConfigService extends BaseApiService {
  protected override endpoint = `${environment.serverUrl.baseUrl}`;

  searchBannerConfigList(body: any) {
    return this.http.get<ResponseModel<any[]>>(
      `${this.endpoint}/banner`,
      {params: body.params}
    );
  }


  createBannerConfig(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/banner`,
      body
    );
  }

  updateBannerConfig(id: any,body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/banner/${id}`,
      body
    );
  }

  findOneBannerConfig(body: any) {
    return this.http.get<ResponseModel<any[]>>( 
      `${this.endpoint}/banner/getById`, 
      {params: body});
   
  }

}
