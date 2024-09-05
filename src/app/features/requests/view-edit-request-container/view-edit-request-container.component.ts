import { ChangeDetectionStrategy, Component, inject, input, signal, OnInit } from '@angular/core';
import { finalize, tap } from 'rxjs';

import { ViewEditRequestComponent } from './view-edit-request/view-edit-request.component';
import { RequestService } from '../../../core/services/request.service';
import { UserRequest } from '../../../core/model/request.model';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { RequestStatus } from '../../../core/model/shared.enums';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-edit-request-container',
  standalone: true,
  imports: [ViewEditRequestComponent, LoaderComponent],
  templateUrl: './view-edit-request-container.component.html',
  styleUrl: './view-edit-request-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEditRequestContainerComponent implements OnInit {
  requestService = inject(RequestService);
  router = inject(Router);
  id = input.required<string>();
  isLoading = signal(false);
  isShowBtnLoader = signal(false);
  requestInfo = signal<UserRequest | undefined>(undefined);

  ngOnInit(): void {
    this.isLoading.set(true);
    this.requestService
      .getRequetDetails(this.id())
      .pipe(
        tap(() => {
          this.getDummyRequests();
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe();
  }
  //TODO: to be removed when there is a real api
  getDummyRequests(): void {
    const request = this.requestService.getRequestStorge().find((req) => req.id === +this.id());
    this.requestInfo.set(request);
  }

  onChangeStatus(status: RequestStatus): void {
    this.isShowBtnLoader.set(true);
    this.requestService
      .updateRequest(this.id(), status)
      .pipe(
        tap(() => {
          this.updateDummyRequests(status);
        }),
        finalize(() => {
          this.isShowBtnLoader.set(false);
        })
      )
      .subscribe();
  }

  updateDummyRequests(status: RequestStatus): void {
    const requestList = this.requestService.getRequestStorge();
    this.requestService.removeRequestStorge();
    const index = requestList.findIndex((req) => req.id === +this.id());
    if (index !== -1) {
      requestList[index].status = status;
    }
    this.requestService.addRequestLocalStorage(requestList);
    this.router.navigate(['/requests']);
  }
}
