import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-request-list-container',
  standalone: true,
  imports: [],
  templateUrl: './request-list-container.component.html',
  styleUrl: './request-list-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestListContainerComponent {}
