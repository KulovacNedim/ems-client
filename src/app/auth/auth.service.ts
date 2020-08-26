import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../auth/user';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient) { }

  authenticatedUser() {
    const token = localStorage.getItem("token");
    if (!token) {
      this.router.navigate(['/sign-in']);
      return;
    }
    return this.http.get('http://localhost:8080/api/auth/users/me', {
      headers: { Authorization: `Bearer ${this.getToken()}` }
    })
    .pipe(
      map((data: any) => {
        // if data store it in ngrx
        if(data.id)  this.router.navigate(['/dashboard']);
        return data;
      })
    );
  }

  login(user: User): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/login', JSON.stringify(user), { observe: 'response' })
      .pipe(
        map((data: any) => {
          const token = data.headers.get('Authorization');
          if (token) this.saveToken(token);
          if (data.status === 200) this.router.navigate(['/dashboard']);
          return data.status;
        })
      );
  }

  logout() {
    // this.router.navigate(['/sign-in']);
  }





  private saveToken(token: string): void {
    localStorage.setItem('token', token.substr(7));
  }

  private getToken(): string {
    // if (! inStore) {
      return localStorage.getItem('token');
    // }
    // return this.token
  }
}
