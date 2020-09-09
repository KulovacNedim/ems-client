import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    Router,
    CanActivate
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AlreadyAuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private authService: AuthService,
        private router: Router) {
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.isAuthentcated.pipe(
            take(1),
            map((isAuth: boolean) => {
                if (!isAuth) {
                    const token = localStorage.getItem("token");
                    if (!token) {
                        return true;
                    }
                    this.authService.getAuthenticatedUserData()
                        .subscribe(
                            user => {
                                if (!user) {
                                    return true;
                                }
                                this.router.navigate(['/dashboard']);
                                return false;
                            }
                        );
                }
                this.router.navigate(['/dashboard']);
                return false;
            })
        )
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.canActivateChild(next, state);
    }
}
