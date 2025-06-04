
import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseApiService } from '@core/services';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigFeildService extends BaseApiService {
  protected override endpoint = `${environment.serverUrl.baseUrl}`;

  searchConfigFieldList(param: any) {
    return this.http.get<ResponseModel<any[]>>(
      `${this.endpoint}/businessDomain`,{params: param}
      
    );
  }


  createConfigField(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/businessDomain`,
      body
    );
  }

  updateConfigField(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/businessDomain/${body.id}`,
      body
    );
  }

  findOneConfigField(id: any) {
    return this.http.get<ResponseModel<any[]>>( `${this.endpoint}/${id}`);
  }


  searchServiceGroupConfigList(body: any) {
    return this.http.get<ResponseModel<any[]>>(
      `${this.endpoint}/serviceGroup`,
      {params: body}
    );
  }


  createServiceGroupConfig(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/serviceGroup`,
      body
    );
  }

  updateServiceGroupConfig(id: any,body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/serviceGroup/${id}`,
      body
    );
  }

  updateServiceGroupPriority(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/serviceGroup/update-priority`,
      body
    );
  }


  updateConfigFieldPriority(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/businessDomain/update-priority`,
      body
    );
  }


  findOneServiceGroupConfig(id: any) {
    return this.http.get<ResponseModel<any[]>>( `${this.endpoint}/${id}`);
  }

}
