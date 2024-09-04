import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha-2';

import { InputComponent } from '../../../shared/components/input/input.component';
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';
import { UserRequest } from '../../../core/model/request.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { SITE_KEY } from '../../../../environment/environment';
import { RequestStatus } from '../../../core/model/shared.enums';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    InputComponent,
    ReactiveFormsModule,
    RecaptchaModule,
    TextareaComponent,
    RecaptchaFormsModule,
    LoaderComponent,
  ],
  providers: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {
  SITE_KEY = SITE_KEY;
  handleForm = output<UserRequest>();
  isLoading = input(false);

  resolved(response: string | null): void {
    // Use the response token as needed
    console.log('reCAPTCHA v2 Response:', response);
  }

  errored(err: string[]) {
    console.warn(`reCAPTCHA error encountered`, err[0]);
  }

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[0-9]+$/)]),
    content: new FormControl('', Validators.required),
    captcha: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.form.status === 'VALID') {
      const formData: UserRequest = {
        username: this.form.get('username')?.value ?? '',
        phone: this.form.get('phone')?.value ?? '',
        email: this.form.get('email')?.value ?? '',
        content: this.form.get('content')?.value ?? '',
        captcha: this.form.get('captcha')?.value ?? '',
        status: RequestStatus.Submitted,
        date: new Date().toISOString(),
        id: +new Date(),
      };
      this.handleForm.emit(formData);
    }
  }
}
