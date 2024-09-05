import { ChangeDetectionStrategy, Component, input, OnInit, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserRequest } from '../../../../core/model/request.model';
import {
  chipStatus,
  SELECT_ALL,
  statusMap,
  statusOptions,
} from '../../../../shared/constant/shared';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { LoaderComponent } from '../../../../shared/components/loader/loader.component';
import { RequestStatus } from '../../../../core/model/shared.enums';

@Component({
  selector: 'app-view-edit-request',
  standalone: true,
  imports: [DatePipe, SelectComponent, LoaderComponent],
  templateUrl: './view-edit-request.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewEditRequestComponent implements OnInit {
  request = input<UserRequest>();
  isLoading = input(false);
  chipStatus = chipStatus;
  statusOptions = statusOptions;
  changeStatus = output<RequestStatus>();
  form = new FormGroup({
    status: new FormControl<'0' | '1' | '2' | ''>('', Validators.required),
  });

  statusMap = statusMap;
  statusIdMap = {
    '0': RequestStatus.NotApplicable,
    '1': RequestStatus.Submitted,
    '2': RequestStatus.Resolved,
  };
  ngOnInit(): void {
    this.statusOptions = statusOptions.filter(
      (option) => option.id !== SELECT_ALL && option.id !== statusMap[this.request()?.status!]
    );
  }
  onSubmit(): void {
    if (this.form.valid) {
      const statusId = this.form.get('status')?.value;
      if (statusId) {
        this.changeStatus.emit(this.statusIdMap[statusId]);
      }
    }
  }
}
