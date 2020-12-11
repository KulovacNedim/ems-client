import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { UserResponse } from '../auth/user';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.isAuthentcated.pipe(
      take(1),
      map((isAuth: boolean) => {
        if (!isAuth) {
          const token = localStorage.getItem('token');
          if (!token) {
            this.router.navigate(['/auth/sign-in']);
            return false;
          }
          this.authService.getAuthenticatedUserData().subscribe((user) => {
            const userResponse = <UserResponse>user;
            const roleNotSet = !!userResponse.notEnabledReasons.filter(
              (r) => r.reason === 'MISSING_ROLE'
            )[0];
            if (roleNotSet) this.router.navigate(['/dashboard/role-not-set']);
            if (!user) {
              this.router.navigate(['/auth/sign-in']);
              return false;
            }
            return true;
          });
        }
        return true;
      })
    );
  }
}
