import { Injectable } from '@angular/core';
import { ResponseModel } from '@core/models';
import { BaseApiService } from '@core/services';
import { environment } from '@environment';

@Injectable({
  providedIn: 'root'
})
export class VideoConfigurationService extends BaseApiService {
  protected override endpoint = `${environment.serverUrl.baseUrl}`;

  searchVideosConfigList(body: any) {
    return this.http.get<ResponseModel<any[]>>(
      `${this.endpoint}/videos`,
      {params: body}
    );
  }


  createVideosConfig(body: any) {
    return this.http.post<ResponseModel<any[]>>(
      `${this.endpoint}/videos`,
      body
    );
  }

  updateVideosConfig(id: any,body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/videos/${id}`,
      body
    );
  }

  updateVideosConfigPriority(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/videos/update-priority`,
      body
    );
  }

  updateVideosConfigPriorityMain(body: any) {
    return this.http.put<ResponseModel<any[]>>(
      `${this.endpoint}/videos/update-priority-main`,
      body
    );
  }

  findOneVideosConfig(id: any) {
    return this.http.get<ResponseModel<any[]>>( `${this.endpoint}/${id}`);
  }

}
