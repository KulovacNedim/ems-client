import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from '../auth/user';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

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
    return this.http.get('http://localhost:8080/api/auth/me')
      .pipe(
        map(user => {
          if (user) {
            this.authentcated.next(true);
            this.authUser.next(user);
          }
          return user;
        }),
        catchError((error: HttpErrorResponse) => {
          //set notification for new login
          this.removeToken()
          this.router.navigate(["/auth/sign-in"]);
          return throwError(error);
      }))
  }

  signIn(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login', JSON.stringify(user), { observe: 'response' })
      .pipe(
        map((data: any) => {
          const token = data.headers.get('Authorization');
          if (token) this.saveToken(token);
          this.authentcated.next(true);
          return data;
        })
      );
  }

  signUp(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', user, { observe: 'response' });
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
  }

  public removeToken(): void {
    localStorage.removeItem("token");
  }
}
