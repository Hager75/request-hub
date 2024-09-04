import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { InputComponent } from '../../../shared/components/input/input.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { UserFormData } from '../../../core/model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  handleForm = output<UserFormData>();
  isLoading = input(false);

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    rememberMe: new FormControl(false, Validators.required),
  });

  onSubmit(): void {
    if (this.form.status === 'VALID') {
      const formData: UserFormData = {
        username: this.form.get('username')?.value!,
        password: this.form.get('password')?.value!,
        rememberMe: this.form.get('rememberMe')?.value!,
      };
      this.handleForm.emit(formData);
    }
  }
}
