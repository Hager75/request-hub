import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestResponse, UserRequest } from '../model/request.model';
import { REQUESTS } from '../../shared/constant/shared';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  createRequest(request: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(`http/200`, request);
  }

  addRequestLocalStorage(request: UserRequest): void {
    const oldRequests = JSON.parse(localStorage.getItem(REQUESTS) || '[]');
    const newRequets = JSON.stringify([...oldRequests, request]);
    localStorage.setItem(REQUESTS, newRequets);
  }

  getRequets(): Observable<RequestResponse<Request>> {
    return this.http.get<RequestResponse<Request>>(`http/200`);
  }
  getRequestStorge(): UserRequest[] {
    return JSON.parse(localStorage.getItem(REQUESTS) || '[]');
  }
}
