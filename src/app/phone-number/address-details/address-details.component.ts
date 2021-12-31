import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent implements OnInit {
  storeId: 0
    mailingAddress: ''
    email: ''
    contactNumber: ''
    displayAddress: ''
    landmark: ''
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }
    ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/account-details']);
  }
  address() {
    const payload = {
      "storeId": 0,
      "mailingAddress": "string",
      "email": "string",
      "contactNumber": "string",
      "displayAddress": "string",
      "landmark": "string"
    };
    this.$http.httpCall().post(this.$api.goTo().address(), payload, {})
      .then(data => {
        const res: any = data;
        //   if (res.status === 200) {
        //     localStorage.setItem("phoneNumber", this.phoneNumber);
        //     data = JSON.parse(res.data);
        //     payload.otp = data['response'].otp;
        //     payload.otpExpirationTime = data['response'].otpExpirationTime;
        //     this._storageService.setVerification(payload);
        //     this.register();
        //   }
        // }, err => {
        //   debugger
        // })
        // .catch(error => {
        //   console.log(error);
        // });
      })
  }
}




