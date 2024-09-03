import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RecaptchaModule,RecaptchaFormsModule } from "ng-recaptcha-2";

import { InputComponent } from "../../../shared/components/input/input.component";
import { TextareaComponent } from '../../../shared/components/textarea/textarea.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule,RecaptchaModule,TextareaComponent,RecaptchaFormsModule],
  providers: [],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ContactUsComponent {
  SITE_KEY="6LcZdzUqAAAAAKDq_Ox2NnZvlwHc_TTnuwpTfKfJ";

  resolved(response: string | null): void {
    // Use the response token as needed
    console.log('reCAPTCHA v2 Response:', response);
  }

  errored(err:any) {
    console.warn(`reCAPTCHA error encountered`);
  }
  
  form = new FormGroup({
    username: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[a-zA-Z]+$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('',[Validators.required, Validators.pattern(/^\+?[0-9]+$/)]),
    content: new FormControl('',Validators.required),
    captcha: new FormControl('',Validators.required),

  })
  onSubmit():void{
    console.log(this.form); 
  }

}
