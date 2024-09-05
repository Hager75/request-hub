import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { RequestService } from './request.service';
import { UserRequest } from '../model/request.model';
import { REQUESTS, STATIC_REQUESTS } from '../../shared/constant/shared';
import { RequestStatus } from '../model/shared.enums';

describe('RequestService', () => {
  let service: RequestService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), RequestService],
    });

    service = TestBed.inject(RequestService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to create a request', () => {
    const mockRequest: UserRequest = {
      ...STATIC_REQUESTS[0],
    };

    service.createRequest(mockRequest).subscribe((request) => {
      expect(request).toEqual(mockRequest);
    });

    const req = httpMock.expectOne(`http/200`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRequest);
  });

  it('should add request to local storage', () => {
    const mockRequests: UserRequest[] = [{ ...STATIC_REQUESTS[0] }];
    service.addRequestLocalStorage(mockRequests);

    const storedRequests = JSON.parse(localStorage.getItem(REQUESTS) || '[]');
    expect(storedRequests).toEqual(mockRequests);
  });

  it('should get requests from local storage', () => {
    const mockRequests: UserRequest[] = [{ ...STATIC_REQUESTS[0] }];

    localStorage.setItem(REQUESTS, JSON.stringify(mockRequests));

    const retrievedRequests = service.getRequestStorge();
    expect(retrievedRequests).toEqual(mockRequests);
  });

  it('should remove requests from local storage', () => {
    const mockRequests: UserRequest[] = [{ ...STATIC_REQUESTS[0] }];

    localStorage.setItem(REQUESTS, JSON.stringify(mockRequests));

    service.removeRequestStorge();
    const storedRequests = localStorage.getItem(REQUESTS);
    expect(storedRequests).toBeNull();
  });

  it('should send a GET request to retrieve requests', () => {
    const mockRequests: UserRequest[] = [{ ...STATIC_REQUESTS[0] }];

    service.getRequests().subscribe((requests) => {
      expect(requests).toEqual(mockRequests);
    });

    const req = httpMock.expectOne(`http/200`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRequests);
  });

  it('should send a GET request to retrieve request details by ID', () => {
    const mockRequest: UserRequest = {
      ...STATIC_REQUESTS[0],
    };

    service.getRequetDetails('1').subscribe((request) => {
      expect(request).toEqual(mockRequest);
    });

    const req = httpMock.expectOne(`http/200/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRequest);
  });

  it('should send a PUT request to update request status', () => {
    const mockRequest: UserRequest = {
      ...STATIC_REQUESTS[0],
    };

    service.updateRequest('1', RequestStatus.Resolved).subscribe((request) => {
      expect(request).toEqual(mockRequest);
    });

    const req = httpMock.expectOne(`http/200/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockRequest);
  });
});
