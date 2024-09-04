import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

import { SLIDER_DATA } from '../../../shared/constant/slider';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent {
  SLIDER_DATA = SLIDER_DATA;
  onClick(sliderId: number): void {
    console.log(sliderId);
  }
}
