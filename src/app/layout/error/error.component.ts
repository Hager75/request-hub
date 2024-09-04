import { ChangeDetectionStrategy, Component, inject, OnDestroy } from '@angular/core';

import { ErrorService } from '../../core/services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent implements OnDestroy {
  errorSevice = inject(ErrorService);

  ngOnDestroy(): void {
    this.errorSevice.resetError();
  }
}
