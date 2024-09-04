import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { TOKEN_STORAGE_KEY } from '../../shared/constant/shared';
import { User, UserFormData } from '../model/user.model';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient, private router:Router) { }

  token$ = new BehaviorSubject<string | null>(
    localStorage.getItem(TOKEN_STORAGE_KEY) || sessionStorage.getItem(TOKEN_STORAGE_KEY) || null
  );


  login(userData:UserFormData): Observable<User> {
    return this.http.post<User>(`auth/login`, userData);
  }

  logout(): void {
    this.token$.next(null);
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(TOKEN_STORAGE_KEY);
    this.router.navigate(['/']);
  }
}
