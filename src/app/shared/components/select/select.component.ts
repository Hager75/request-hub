import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Option } from '../../../core/model/shared.enums';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './select.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  title = input.required<string>();
  id = input.required<string>();
  control = input.required<string>();
  form = input.required<FormGroup>();
  items = input.required<Option[]>();
}
