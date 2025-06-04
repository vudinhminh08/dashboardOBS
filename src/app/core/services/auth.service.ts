import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { BaseApiService } from './base-api.service';
import { LocalStorageUtil } from "@core/utils/local-storage.util";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@core/constants/local-storage.constants.key";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseApiService {
  private _authenticated = false;
  protected override endpoint = this.buildUrl('/user');

  get accessToken(): string {
    return LocalStorageUtil.getItem(ACCESS_TOKEN_KEY);
  }

  set accessToken(token: string) {
    LocalStorageUtil.setItem(ACCESS_TOKEN_KEY, token);
  }

  get refreshToken(): string {
    return LocalStorageUtil.getItem(REFRESH_TOKEN_KEY);
  }

  set refreshToken(token: string) {
    LocalStorageUtil.setItem(REFRESH_TOKEN_KEY, token);
  }

  signIn(body: any) {
    return this.http.post(this.buildUrl('login'), body);
  }

  signInUsingRefreshToken() {
    // const refreshToken
    return this.http
      .post(this.buildUrl('refresh-token'), {
        params: {
          token: this.refreshToken
        }
      })
      .pipe(
        catchError(() => of(false)),
        switchMap((response: any) => {
          this.accessToken = response.accessToken;
          this._authenticated = true;
          return of(true);
        })
      );
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    if (this.accessToken) {
      return of(true);
    }

    // Check the access token availability
    if (!this.refreshToken) {
      return of(false);
    }

    return of(false);
    // If the access token exists and it didn't expire, sign in using it
    // return this.signInUsingRefreshToken(); // ko có refresh token nên return false luôn
  }
}
