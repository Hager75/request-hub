import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { User, UserFormData } from '../model/user.model';
import {
  clearTokenStorage,
  getTokenStorage,
  setTokenStorage,
} from '../helpers/helpers';
import { Storage } from '../model/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient, private router: Router) {}

  private token = signal<string | null>(getTokenStorage());
  userToken = this.token.asReadonly();

  login(userData: UserFormData): Observable<User> {
    return this.http.post<User>(`auth/login`, userData).pipe(
      tap((user: User) => {
        this.token.set(user.token);
        setTokenStorage(
          user.token,
          userData.rememberMe ? Storage.Local : Storage.Session
        );
      })
    );
  }

  logout(): void {
    this.token.set(null);
    clearTokenStorage();
    this.router.navigate(['/']);
  }
}
