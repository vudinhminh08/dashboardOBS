import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpHeaders, HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpHeaderInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Tạo requestId và requestTime
    const requestId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const requestTime = new Date().toISOString();

    const headers = new HttpHeaders({
      'Accept-Language': 'vi',
      'requestId': requestId,
      'requestTime': requestTime
    });

    const modifiedRequest = request.clone({
      headers: headers,
    });

    // Pass the modified request to the next handler
    return next.handle(modifiedRequest);
  }
}
