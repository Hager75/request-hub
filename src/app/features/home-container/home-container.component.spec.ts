import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../core/services/request.service';
import { HomeContainerComponent } from './home-container.component';
import { of } from 'rxjs';
import { UserRequest } from '../../core/model/request.model';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import { SliderComponent } from './slider/slider.component';
import { PartnersComponent } from './partners/partners.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { RequestStatus } from '../../core/model/shared.enums';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('HomeContainerComponent', () => {
  let component: HomeContainerComponent;
  let fixture: ComponentFixture<HomeContainerComponent>;
  let requestService: jasmine.SpyObj<RequestService>;
  let toastr: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    const requestServiceSpy = jasmine.createSpyObj('RequestService', [
      'createRequest',
      'addRequestLocalStorage',
    ]);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success']);

    await TestBed.configureTestingModule({
      imports: [
        HomeContainerComponent,
        LoaderComponent,
        SliderComponent,
        PartnersComponent,
        ContactUsComponent,
      ],
      providers: [
        provideMockStore(),
        provideHttpClientTesting(),
        { provide: RequestService, useValue: requestServiceSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeContainerComponent);
    component = fixture.componentInstance;
    requestService = TestBed.inject(RequestService) as jasmine.SpyObj<RequestService>;
    toastr = TestBed.inject(ToastrService) as jasmine.SpyObj<ToastrService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call requestService.createRequest and toastr.success on successful form submission', () => {
    const formData: UserRequest = {
      username: 'Sara',
      phone: '0125484545',
      email: 'sara@gmail.com',
      content: 'test content',
      captcha: 'dummy-token',
      id: 1,
      date: '01-02-2024',
      status: RequestStatus.Submitted,
    };
    requestService.createRequest.and.returnValue(of(formData));

    component.onSubmit(formData);

    expect(requestService.createRequest).toHaveBeenCalledWith(formData);
    expect(requestService.addRequestLocalStorage).toHaveBeenCalledWith([formData]);
    expect(toastr.success).toHaveBeenCalledWith('Request is added Successfully!');
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error response from requestService.createRequest', () => {
    const formData: UserRequest = {
      username: 'Sara',
      phone: '0125484545',
      email: 'sara@gmail.com',
      content: 'test content',
      captcha: 'dummy-token',
      id: 1,
      date: '01-02-2024',
      status: RequestStatus.Submitted,
    };
    requestService.createRequest.and.returnValue(of());

    component.onSubmit(formData);

    expect(requestService.createRequest).toHaveBeenCalledWith(formData);
    expect(requestService.addRequestLocalStorage).not.toHaveBeenCalled();
    expect(toastr.success).not.toHaveBeenCalled();
    expect(component.isLoading()).toBeFalse();
  });

  it('should bind isLoading to the loading state of the component', () => {
    fixture.detectChanges();

    component.isLoading.set(true);
    fixture.detectChanges();

    const loadingIndicator = fixture.nativeElement.querySelector('app-loader');
    expect(loadingIndicator).toBeTruthy();
  });
});
