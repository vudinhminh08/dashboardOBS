import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseApiService } from '@core/services';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceConfigService extends BaseApiService {
  protected override endpoint = `${environment.serverUrl.baseUrl}`;


  getGlobalListService(body: any) {
    return this.http.get<ResponseModel<any[]>>(
      `${this.endpoint}/globalList/list-config`,
      {params: body}
    );
  }

  searchServiceConfigList(body: any) {
    return this.http.get<ResponseModel<any[]>>(
      `${this.endpoint}/service`,
      {params: body}
    );
  }


  createServiceConfig(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/service`,
      body
    );
  }

  updateServiceConfig(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/service/${body?.id}`,
      body
    );
  }

  updateServiceConfigPriority(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/service/update-priority`,
      body
    );
  }

  updateServiceConfigPriorityMain(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/service/update-priority-main`,
      body
    );
  }

  findOneServiceConfig(body: any) {
      return this.http.get<ResponseModel<any[]>>( 
        `${this.endpoint}/service/getById`,
         {params: body}
         );
  }

  

}
