import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss'],
})
export class StoreDetailsComponent implements OnInit {
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }
  storeId: 0
  quickCode: any
  description: any
  imageUrl: any
  mailingAddress: any
  email: string
  mobileNumber: any
  contactNumber: any

  opening: any
  closing: any
  deliveryChargesCode: 0
  cod: true
  onlyCodAvailable: true
  minOrderAmount: 0
  ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/address-details']);
  }

  create() {
    const payload = {
      quickCode: this.quickCode,
      storeId: 0,
      description: '',
      imageUrl: '',
      mailingAddress: '',
      email: '',
      mobileNumber: '',
      contactNumber: '',

      opening: '',
      closing: '',
      deliveryChargesCode: 0,
      cod: true,
      onlyCodAvailable: true,
      minOrderAmount: 0
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
