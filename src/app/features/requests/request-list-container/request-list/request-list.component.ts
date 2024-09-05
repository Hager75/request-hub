import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { UserRequest } from '../../../../core/model/request.model';
import { Option } from '../../../../core/model/shared.enums';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import {
  chipStatus,
  sortByOptions,
  sortDateTypeOptions,
  statusMap,
  statusOptions,
} from '../../../../shared/constant/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-list',
  standalone: true,
  imports: [DatePipe, SelectComponent, ReactiveFormsModule],
  templateUrl: './request-list.component.html',
  styleUrl: './request-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestListComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  list = input.required<UserRequest[]>();
  filteredList = signal<UserRequest[]>([]);
  chipStatus = chipStatus;
  statusOptions = statusOptions;
  sortType = signal<Option[]>(sortDateTypeOptions);
  form = new FormGroup({
    status: new FormControl('-1'),
    date: new FormControl('-1'),
    sortBy: new FormControl<'date' | 'status'>('date'),
    sortType: new FormControl<'0' | '1' | '2' | '-1'>('-1'),
  });

  sortByOptions = sortByOptions;

  statusMap = statusMap;

  ngOnInit(): void {
    this.filteredList.set([...this.list()]);
    const sortBySubscription = this.form.get('sortBy')?.valueChanges.subscribe((value) => {
      this.sortType.set(value === 'date' ? sortDateTypeOptions : statusOptions);
      this.form.get('sortType')?.setValue('-1');
    });

    const sortTypeSubscription = this.form.get('sortType')?.valueChanges.subscribe((value) => {
      if (value) {
        this.sortRequests(this.form.get('sortBy')?.value ?? 'date', value);
      }
    });
    this.destroyRef.onDestroy(() => {
      sortTypeSubscription?.unsubscribe();
      sortBySubscription?.unsubscribe();
    });
  }

  sortRequests(value: 'date' | 'status', type: '0' | '1' | '2' | '-1'): void {
    if (value === 'date') {
      this.sortByDate(type);
    } else {
      this.sortStatus(type);
    }
  }

  sortByDate(type: '0' | '1' | '2' | '-1'): void {
    this.filteredList.set(
      [...this.list()].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        if (type === '1') {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      })
    );
  }

  sortStatus(type: '0' | '1' | '2' | '-1'): void {
    if (type === '-1') {
      this.filteredList.set([...this.list()]);
    } else {
      const selectedstatusList = this.list().filter((req) => this.statusMap[req.status] === type);
      const sortedList = [...this.list()]
        .filter((req) => this.statusMap[req.status] !== type)
        .sort((a, b) => a.status.localeCompare(b.status));
      this.filteredList.set([...selectedstatusList, ...sortedList]);
    }
  }

  onClick(id: number): void {
    this.router.navigate(['/requests', id]);
  }
}
