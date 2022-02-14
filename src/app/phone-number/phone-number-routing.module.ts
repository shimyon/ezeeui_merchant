import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterUserComponent } from "./register-user/register-user.component";
import { RegistrationDetailsComponent } from "./registration-details/registration-details.component";
import { AccountDetailsComponent } from "./account-details/account-details.component";
import { DocumentDetailsComponent } from "./document-details/document-details.component";
import { VerifyOtpComponent } from "./verify-otp/verify-otp.component";
import { ViewRegistrationDetailsComponent } from "./view-registration-details/view-registration-details.component";
import { PhoneNumberPage } from './phone-number.page';
import { StoreDetailsComponent } from './store-details/store-details.component';
import { AddressDetailsComponent } from './address-details/address-details.component';
import { IonicModule } from '@ionic/angular';
const routes: Routes = [
  {
    path: '',
    component: RegisterUserComponent
  },
  {
    path: 'registration',
    component: RegistrationDetailsComponent
  },
  {
    path: 'view-registration',
    component: ViewRegistrationDetailsComponent
  },
  {
    path: 'account-details',
    component: AccountDetailsComponent
  },
  {
    path: 'store-details',
    component: StoreDetailsComponent
  },
  {
    path: 'address-details',
    component: AddressDetailsComponent
  },
  {
    path: 'document-details',
    component: DocumentDetailsComponent
  },
  {
    path: 'otp',
    component: VerifyOtpComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes),IonicModule.forRoot()],
  exports: [RouterModule],
})
export class PhoneNumberPageRoutingModule { }
