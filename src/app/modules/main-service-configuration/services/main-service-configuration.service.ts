import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseApiService } from '@core/services';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class MainServiceConfigurationService extends BaseApiService {
  protected override endpoint = `${environment.serverUrl.baseUrl}`;

  searchMainServicesList(body: any) {
    console.log('abc', environment.serverUrl.baseUrl);
    
    return this.http.get<ResponseModel<any[]>>(
      `${this.endpoint}/serviceCore`,{params: body}
      
    );
  }


  createMainServices(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/serviceCore`,
      body
    );
  }

  updateMainServices(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/serviceCore/${body.id}`,
      body 
    );
  }

  updateMainServicePriority(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/serviceCore/update-priority`,
      body
    );
  }



  findOneMainServices(id: any) {
    return this.http.get<ResponseModel<any[]>>( `${this.endpoint}/${id}`);
  }

}
