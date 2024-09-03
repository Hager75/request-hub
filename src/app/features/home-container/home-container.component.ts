import { Component } from '@angular/core';

import { SliderComponent } from "./slider/slider.component";
import { PartnersComponent } from "./partners/partners.component";

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [SliderComponent, PartnersComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',

})
export class HomeContainerComponent {
 

}
