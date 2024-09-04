import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';

import { ErrorService } from '../services/error.service';

export const errorResolver: ResolveFn<boolean> = () => {
  const router = inject(Router);
  const errorSevice = inject(ErrorService);

  if (errorSevice.errorMessage()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};
