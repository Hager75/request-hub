import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SliderComponent } from "./slider/slider.component";
import { PartnersComponent } from "./partners/partners.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [SliderComponent, PartnersComponent, ContactUsComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomeContainerComponent { 
}
