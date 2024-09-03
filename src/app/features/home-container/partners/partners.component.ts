import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CLIENTS_DATA } from '../../../shared/constant/partners';

@Component({
  selector: 'app-partners',
  standalone: true,
  imports: [],
  templateUrl: './partners.component.html',
  styleUrl: './partners.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PartnersComponent {
  CLIENTS_DATA=CLIENTS_DATA;

}
