import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { RequestListComponent } from './request-list/request-list.component';
import { RequestService } from '../../../core/services/request.service';
import { finalize, tap } from 'rxjs';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { UserRequest } from '../../../core/model/request.model';
import { STATIC_REQUESTS } from '../../../shared/constant/shared';

@Component({
  selector: 'app-request-list-container',
  standalone: true,
  imports: [RequestListComponent, LoaderComponent],
  templateUrl: './request-list-container.component.html',
  styleUrl: './request-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestListContainerComponent implements OnInit {
  requestService = inject(RequestService);
  isLoading = signal(false);
  requestList = signal<UserRequest[]>([]);
  ngOnInit(): void {
    this.isLoading.set(true);
    this.requestService
      .getRequests()
      .pipe(
        tap(() => {
          const addedRequests = this.requestService.getRequestStorge();
          if (addedRequests.length === 0) {
            this.requestService.removeRequestStorge();
            this.requestService.addRequestLocalStorage([...STATIC_REQUESTS]);
            this.requestList.set(this.sortListByDate(STATIC_REQUESTS));
          } else {
            this.requestList.set(this.sortListByDate(addedRequests));
          }
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }

  sortListByDate(list: UserRequest[]): UserRequest[] {
    return [
      ...list.sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateB - dateA;
      }),
    ];
  }
}
