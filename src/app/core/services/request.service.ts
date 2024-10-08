import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UserRequest } from '../model/request.model';
import { REQUESTS } from '../../shared/constant/shared';
import { RequestStatus } from '../model/shared.enums';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  createRequest(request: UserRequest): Observable<UserRequest> {
    return this.http.post<UserRequest>(`http/200`, request);
  }

  addRequestLocalStorage(request: UserRequest[]): void {
    const oldRequests = JSON.parse(localStorage.getItem(REQUESTS) || '[]');
    const newRequets = JSON.stringify([...oldRequests, ...request]);
    localStorage.setItem(REQUESTS, newRequets);
  }

  getRequests(): Observable<UserRequest[]> {
    return this.http.get<UserRequest[]>(`http/200`);
  }

  getRequestStorge(): UserRequest[] {
    return JSON.parse(localStorage.getItem(REQUESTS) || '[]');
  }

  removeRequestStorge(): void {
    localStorage.removeItem(REQUESTS);
  }

  getRequetDetails(id: string): Observable<UserRequest> {
    return this.http.get<UserRequest>(`http/200/${id}`);
  }

  updateRequest(id: string, status: RequestStatus): Observable<UserRequest> {
    return this.http.put<UserRequest>(`http/200/${id}`, {});
  }
}
