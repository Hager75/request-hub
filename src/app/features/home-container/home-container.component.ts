import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { SliderComponent } from "./slider/slider.component";
import { PartnersComponent } from "./partners/partners.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { RequestService } from '../../core/services/request.service';
import { Request } from '../../core/model/request.model';
import { LoaderComponent } from "../../shared/components/loader/loader.component";

@Component({
  selector: 'app-home-container',
  standalone: true,
  imports: [SliderComponent, PartnersComponent, ContactUsComponent, LoaderComponent],
  templateUrl: './home-container.component.html',
  styleUrl: './home-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class HomeContainerComponent { 
  requestService= inject(RequestService);
  toastr= inject(ToastrService);
  isLoading = signal(false);

  onSubmit(formData:Request): void {
     this.isLoading.set(true);
    this.requestService.createRequest(formData).pipe(tap((res) => {
      this.toastr.success('Request is added Successfully!');
      this.requestService.addRequestLocalStorage(formData);
    }), finalize(() => {
      this.isLoading.set(false);
    })).subscribe();

  }
}
