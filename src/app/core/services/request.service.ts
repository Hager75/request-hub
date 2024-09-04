import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { RequestResponse, Request } from '../model/request.model';
import { REQUESTS } from '../../shared/constant/shared';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  constructor(private http: HttpClient) {}

  createRequest(request: Request): Observable<RequestResponse<Request>> {
    return this.http.post<RequestResponse<Request>>(`http/200`, request);
  }

  addRequestLocalStorage(request: Request): void {
    const oldRequests = JSON.parse(localStorage.getItem(REQUESTS) || '[]');
    const newRequets = JSON.stringify([...oldRequests, request]);
    localStorage.setItem(REQUESTS, newRequets);
  }
}
