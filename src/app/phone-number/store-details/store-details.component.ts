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
  storeId: ''
  quickCode: ""
  description: ""
  imageUrl: ""
  longitude: ""
  latitude: ""
  opening:""
  closing: ""
  deliveryChargesCode: ''
  onlyCodAvailable: ''
  minOrderAmount: ''
  deliveryCharges = []
  selecteddeliveryCharges = null;


  ionViewDidEnter() {
    this.getdropdown()
  }

  ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/address-details']);
  }

  getdropdown() {
    let url = this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
        const res: any = data;
        if (res.status === 200) {
          data = JSON.parse(res.data);
          data = data['response'];
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
  basic() {
    const payload = {
      "storeId": 0,
      "quickCode": this.quickCode,
      "description": this.description,
      "imageUrl": this.imageUrl,
      "longitude": this.longitude,
      "latitude": this.latitude,
      "opening": this.opening,
      "closing": this.closing,
      "deliveryChargesCode": parseInt(this.selecteddeliveryCharges),
      "onlyCodAvailable": this.onlyCodAvailable,
      "minOrderAmount": parseFloat(this.minOrderAmount)
    };
    this.$http.httpCall().post(this.$api.goTo().basic(), payload, {})
      .then(data => {
        debugger
        const res: any = data;
        if (res.status === 200) {
         alert("save data successfully")
          this.register();
          console.log("store details added.");
        }
        
      }, err => {
        debugger
      })
      .catch(error => {
        console.log(error);
      });
  }
}