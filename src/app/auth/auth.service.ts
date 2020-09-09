import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../auth/user';
import { HttpClient } from '@angular/common/http';
import { map, catchError, take } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authentcated = new BehaviorSubject<boolean>(false);
  private authUser = new BehaviorSubject<any>(null);
  get isAuthentcated() {
    return this.authentcated.asObservable();
  }

  constructor(private router: Router, private http: HttpClient) { }
  autoLogin() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/auth/sign-in']);
      return;
    }
    return this.getAuthenticatedUserData();
  }

  getAuthenticatedUserData() {
    return this.http.get('http://localhost:8080/api/auth/me', {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
      .pipe(map(user => {
        if (user) {
          this.authentcated.next(true);
          this.authUser.next(user);
        }
        return user;
      }))
  }



  authenticatedUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/auth/sign-in']);
      return;
    }
    return this.http.get('http://localhost:8080/api/auth/me', {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
      .pipe(
        map((data: any) => {
          // if data store it in ngrx
          if (data) {
            this.authentcated.next(true);
            this.authUser.next(data);
          }
          if (data.id) this.router.navigate(['/dashboard']);
          return data;
        }),
        catchError((err) => {
          return this.router.navigate(['/auth/sign-in']);
        })
      );
  }
  authenticatedUser1() {
    const token = localStorage.getItem("token");
    if (!token) {
      // this.router.navigate(['/auth/sign-in']);
      return of('');
    }
    return this.http.get('http://localhost:8080/api/auth/me', {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
      .pipe(
        map((data: any) => {
          // if data store it in ngrx
          if (data) {
            this.authentcated.next(true);
            this.authUser.next(data);
          }
          return data;
        }),
        // catchError((err) => {
        //   // return this.router.navigate(['/auth/sign-in']);
        // })
      );
  }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login', JSON.stringify(user), { observe: 'response' })
      .pipe(
        map((data: any) => {
          const token = data.headers.get('Authorization'); console.log(data.headers)
          if (token) this.saveToken(token);
          this.authentcated.next(true);
          return data.status;
        })
      );
  }

  signUp(user: User): Observable<any> {
    console.log(user)
    return this.http.post('http://localhost:8080/api/auth/signup', user, { observe: 'response' })
      .pipe(
        map((data: any) => {
          if (data.status === 200) this.router.navigate(['/sign-in']);
          return data;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.authentcated.next(false);
    this.router.navigate(['/auth/sign-in']);
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token.substr(7));
  }

  public getToken(): string {
    // if (! inStore) {
    return localStorage.getItem('token');
    // }
    // return this.token
  }

  private handleError(err) {
    return throwError(err);
  }
}
