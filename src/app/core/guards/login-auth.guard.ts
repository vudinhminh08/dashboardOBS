import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';
import { AuthService } from '@core/services';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoginAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this._check('/');
  }

  private _check(redirectURL: string): Observable<boolean> {
    // Check the authentication status
    return this.authService.check().pipe(
      switchMap((authenticated: boolean) => {
        // If the user is not authenticated...
        if (!authenticated) {
          // Allow the access login page
          return of(true); // nếu ko có accessTokenn thì login page can load,
        }

        // Prevent the access login page
        this.router.navigate(['/']); // nếu đã có accessToken thì redirect về trang chủ
        return of(false);
      })
    );
  }
}
