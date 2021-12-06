import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss'],

})
export class RegistrationDetailsComponent implements OnInit {
  SelectBox = "";

  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }
  "storeId": 0
  "storeName": "string"
  "cityId": 0
  "pinCodeLookupId": 0
  "proprietorName": "string"
  "serviceId": "string"
  ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/store-details']);
  }

  create() {
    const payload = {
      "storeId": 0,
      "storeName": "string",
      "cityId": 0,
      "pinCodeLookupId": 0,
      "proprietorName": "string",
      "serviceId": "string"
    };
    debugger
    this.$http.httpCall().post(this.$api.goTo().create(), payload, {})
      .then(data => {
        debugger
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
