import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterUserComponent } from "./register-user/register-user.component";
import { RegistrationDetailsComponent } from "./registration-details/registration-details.component";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { DocumentDetailsComponent } from "./document-details/document-details.component";
import { VerifyOtpComponent } from "./verify-otp/verify-otp.component";
import { ViewRegistrationDetailsComponent } from "./view-registration-details/view-registration-details.component";
import { IonicModule } from '@ionic/angular';
import { PhoneNumberPageRoutingModule } from './phone-number-routing.module';
import { PhoneNumberPage } from './phone-number.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,  
    PhoneNumberPageRoutingModule
  ],
  declarations: [PhoneNumberPage, RegisterUserComponent, VerifyOtpComponent, RegistrationDetailsComponent, ViewRegistrationDetailsComponent, AccountDetailsComponent, DocumentDetailsComponent]
})
export class PhoneNumberPageModule {}
