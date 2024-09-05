import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { RequestListContainerComponent } from './request-list-container.component';
import { RequestService } from '../../../core/services/request.service';
import { UserRequest } from '../../../core/model/request.model';
import { STATIC_REQUESTS } from '../../../shared/constant/shared';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RequestListComponent } from './request-list/request-list.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('RequestListContainerComponent', () => {
  let component: RequestListContainerComponent;
  let fixture: ComponentFixture<RequestListContainerComponent>;
  let requestService: jasmine.SpyObj<RequestService>;

  beforeEach(async () => {
    const requestServiceSpy = jasmine.createSpyObj('RequestService', [
      'getRequests',
      'getRequestStorge',
      'removeRequestStorge',
      'addRequestLocalStorage',
    ]);

    await TestBed.configureTestingModule({
      imports: [RequestListContainerComponent, LoaderComponent, RequestListComponent],
      providers: [
        provideMockStore(),
        provideHttpClientTesting(),
        { provide: RequestService, useValue: requestServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RequestListContainerComponent);
    component = fixture.componentInstance;
    requestService = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
  });

  it('should populate and sort requestList on successful fetch', () => {
    const mockRequests: UserRequest[] = [
      { ...STATIC_REQUESTS[0], date: '2024-09-01' },
      { ...STATIC_REQUESTS[1], date: '2024-09-03' },
    ];
    requestService.getRequests.and.returnValue(of(mockRequests));
    requestService.getRequestStorge.and.returnValue(mockRequests);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const sortedRequests = component.requestList();
      expect(sortedRequests.length).toBe(mockRequests.length);
      expect(sortedRequests[0].date).toBe('2024-09-03');
    });
  });
});
