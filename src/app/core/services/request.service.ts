import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResponse,Request } from '../model/request.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(private http: HttpClient) {}

  createRequest(request:Request):Observable<RequestResponse<Request>> {
    return this.http.post<RequestResponse<Request>>(`http/200`, request);
  }

}
