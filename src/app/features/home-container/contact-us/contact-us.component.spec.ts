import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha-2';
import { ContactUsComponent } from './contact-us.component';
import { UserRequest } from '../../../core/model/request.model';
import { RequestStatus } from '../../../core/model/shared.enums';
import { SIGNAL, signalSetFn } from '@angular/core/primitives/signals';
import { InputComponent } from '../../../shared/components/input/input.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactUsComponent,
        InputComponent,
        LoaderComponent,
        TextareaComponent,
        ReactiveFormsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    const form = component.form;

    expect(form.get('username')?.value).toBe('');
    expect(form.get('email')?.value).toBe('');
    expect(form.get('phone')?.value).toBe('');
    expect(form.get('content')?.value).toBe('');
    expect(form.get('captcha')?.value).toBe('');
  });

  it('should not submit the form if it is invalid', () => {
    spyOn(component.handleForm, 'emit');

    component.onSubmit();

    expect(component.handleForm.emit).not.toHaveBeenCalled();
  });

  it('should emit form data if the form is valid', () => {
    spyOn(component.handleForm, 'emit');

    // Set valid form values
    component.form.setValue({
      username: 'John',
      email: 'john@example.com',
      phone: '1234567890',
      content: 'This is a test message.',
      captcha: 'test-captcha-token',
    });

    component.onSubmit();

    const expectedFormData: UserRequest = {
      username: 'John',
      email: 'john@example.com',
      phone: '1234567890',
      content: 'This is a test message.',
      captcha: 'test-captcha-token',
      status: RequestStatus.Submitted,
      date: new Date().toISOString(),
      id: +new Date(),
    };

    expect(component.handleForm.emit).toHaveBeenCalledWith(expectedFormData);
  });

  it('should display an error message if captcha is missing', () => {
    const form = component.form;

    form.patchValue({ captcha: '' });
    form.get('captcha')?.markAsTouched();

    fixture.detectChanges();

    const errorMsg = fixture.nativeElement.querySelector('.text-error');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg.textContent).toContain('Captcha is required');
  });

  it('should handle reCAPTCHA success and error events', () => {
    spyOn(console, 'log');
    spyOn(console, 'warn');

    const captchaResponse = 'sample-token';
    component.resolved(captchaResponse);
    expect(console.log).toHaveBeenCalledWith('reCAPTCHA v2 Response:', captchaResponse);

    const errorArray = ['error-message'];
    component.errored(errorArray);
    expect(console.warn).toHaveBeenCalledWith('reCAPTCHA error encountered', 'error-message');
  });

  it('should disable the submit button when loading', () => {
    signalSetFn(component.isLoading[SIGNAL], false);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(true);
  });

  it('should enable the submit button when not loading', () => {
    signalSetFn(component.isLoading[SIGNAL], true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.disabled).toBe(false);
  });
});
