import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  className = input('text-center');
}
