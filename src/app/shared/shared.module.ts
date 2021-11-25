import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApiRouting, validationMessage } from '.';
import { IonicModule } from '@ionic/angular';
import { appNumberOnly } from './directive/integer-number.directive';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [appNumberOnly],
  providers: [ApiRouting, validationMessage]
})
export class SharedModule { }
