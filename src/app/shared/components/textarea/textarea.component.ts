import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './textarea.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaComponent {
  title = input.required();
  fieldPlaceholder = input();
  id = input.required();
  control = input.required<string>();
  form = input.required<FormGroup>();
  validationMsg = input<string>();

  onChange(): void {
    const requestData = this.form()?.get(this.control())?.value?.trimLeft();
    if (requestData?.length > 0) {
      this.form()?.get(this.control())?.setValue(requestData);
    } else {
      this.form()?.get(this.control())?.setValue(null);
    }
  }
}
