import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from '@environment';
import { BaseCrudApiService } from '@core/services';
import { ResponseModel } from '@core/models';
import { ChangePasswordRequest, LoginRequest, LoginResponsed } from '@modules/auth/models';
import { catchError } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept-Language': 'vi'
    // 'apikey': 'top-secret-key'
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService extends BaseCrudApiService<any> {

  login(params: LoginRequest): Observable<LoginResponsed> {
    const url = this.buildUrl(`/auth/login`);
    return this.http.post<LoginResponsed>(url, params, httpOptions);
  }

  getUserInfo(): Observable<any> {
    return this.http.get<ResponseModel<LoginResponsed>>(this.buildUrl('/user/user-info'));
  }


  changePassword(body: ChangePasswordRequest){

    const url = this.buildUrl('/user/change-password');
    return this.http.put(url, body,{
      responseType: 'text'
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
        // return throwError({error: JSON.parse(error.error)});
      })
    );
  }

}


