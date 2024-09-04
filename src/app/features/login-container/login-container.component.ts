import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { LoginComponent } from './login/login.component';
import { LoginService } from '../../core/services/login.service';
import { UserFormData } from '../../core/model/user.model';

@Component({
  selector: 'app-login-container',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './login-container.component.html',
  styleUrl: './login-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent {
  loginService = inject(LoginService);
  toastr = inject(ToastrService);
  isLoading = signal(false);
  router = inject(Router);
  onSubmit(formData: UserFormData): void {
    this.isLoading.set(true);
    this.loginService
      .login(formData)
      .pipe(
        tap(() => {
          this.toastr.success('Logged in Successfully!');
          this.router.navigate(['/requests']);
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }
}
