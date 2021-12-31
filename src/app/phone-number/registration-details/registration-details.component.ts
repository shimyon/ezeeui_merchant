import { ThrowStmt } from '@angular/compiler';
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
  storeId: ''
  storeName: ""
  cityId: 0
  pinCodeLookupId: 0
  proprietorName: ""
  serviceId: ""
  phoneNumber: string;
  states = []
  selectedState = null;
  service1 = []
  selectedService = null;
  city = []
  selectedcity = null;
  pincode = []
  selectedpincode = null;
  private _storageService: any;
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() {
    this.getdropdown()
    //this.getcitypincode()  
  }

  register() {
    this.route.navigate(['./phone-number/store-details']);
  }

  getdropdown() {
    let url = this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
        const res: any = data;
        if (res.status === 200) {
          data = JSON.parse(res.data);
          data = data['response'];
          this.states = data['stateCollection'];
          this.service1 = data['serviceCollection'];
        }
      },
        _err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });

  }

  cityDisabled = true;
  pincodeDisabled = true;

  cityChange(): void {
    this.getcitypincode();
    this.cityDisabled = false;
    this.pincodeDisabled = true;
  }

  pincodeChange(): void {
    if (this.selectedcity) {
      this.getcitypincode();
      this.pincodeDisabled = false;
    } else {
      this.getcitypincode();
      this.pincodeDisabled = true;
    }
  }



  getcitypincode() {
    let url = this.$api.goTo().getcitypincode();
    this.$http.httpCall().post(url, {
      stateid: this.selectedState
    }, {})
      .then(data => {
        const res: any = data;
        if (res.status === 200) {
          data = JSON.parse(res.data);
          data = data['response'];
          this.city = data['cityCollection'];
          this.pincode = data['pincodeCollection'];
        }
      },
        _err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });

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
    // .then(data => {
    //     debugger
    //     const res: any = data;
    //       if (res.status === 200) {
    //         localStorage.setItem("storeId", this.storeId);
    //         data = JSON.parse(res.data);
    //         payload.storeName = data['response'].storeName;
    //         payload.cityId = data['response'].cityId;
    //         payload.pinCodeLookupId = data['response'].pinCodeLookupId;
    //         payload.proprietorName = data['response'].proprietorName;
    //         payload.serviceId = data['response'].serviceId;
    //         this._storageService.setVerification(payload);
    //         this.register();
    //       }
    //   }, err => {
    //       debugger
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
  }

}
