import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

import { LoginService } from '../services/login.service';
import { ErrorService } from '../services/error.service';

export const authGuard: CanMatchFn = () => {
  const loginService = inject(LoginService);
  const errorService = inject(ErrorService);
  const router = inject(Router);
  const isLoggedIn = loginService.userToken();
  if (!isLoggedIn) {
    errorService.setError("You can't access this page");
    return router.createUrlTree(['/error']);
  }
  return true;
};
