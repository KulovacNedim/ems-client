import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.isAuthentcated.pipe(
      take(1),
      map((isAuth: boolean) => {
        if (!isAuth) {
          const token = localStorage.getItem("token");
          if (!token) {
            this.router.navigate(['/auth/sign-in']);
            return false;
          }
          this.authService.getAuthenticatedUserData()
            .subscribe(
              user => {
                if (!user) {
                  this.router.navigate(['/auth/sign-in']);
                  return false;
                }
                return true;
              }
            );
        }
        return true;
      })
    )
  };
}
