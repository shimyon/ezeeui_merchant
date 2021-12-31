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
  
  opening: any
  closing: any
  deliveryChargesCode: 0
  onlyCodAvailable: true
  minOrderAmount: 0
  deliveryCharges = []
  selecteddeliveryCharges=null;
 

  ngOnInit() {this.getdropdown() }

  register() {
    this.route.navigate(['./phone-number/address-details']);
  }

  getdropdown() {
    let url =this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
            const res: any = data;
              if (res.status === 200) {
                data = JSON.parse(res.data);
                data= data['response'];
                this.deliveryCharges = data['deliveryChargesCollection'];
                               
              }
      },
        err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });

  }

  create() {
    const payload = {
      quickCode: this.quickCode,
      storeId: 0,
      description: '',
      imageUrl: '',
      
      opening: '',
      closing: '',
      deliveryChargesCode: 0,
      onlyCodAvailable: true,
      minOrderAmount: 0
    };
    this.$http.httpCall().post(this.$api.goTo().create(), payload, {})
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
