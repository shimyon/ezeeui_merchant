import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { message } from 'src/app/utils';
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
  cityDisabled = true;
  pincodeDisabled = true;

  private _storageService: any;
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() {

  }

  ionViewDidEnter() {
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


  stateChange(): void {
    this.getcitypincode();
    this.cityDisabled = false;
    this.pincodeDisabled = false;
  }

  getcitypincode() {
    let url = this.$api.goTo().getcitypincode();
    this.$http.httpCall().post(url, {
      stateId: parseInt(this.selectedState)
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
      "storeName": this.storeName,
      "cityId": parseInt(this.selectedcity),
      "pinCodeLookupId": parseInt(this.selectedpincode),
      "proprietorName": this.proprietorName,
      "serviceId": this.selectedService.filter(f => f != '').toString()
    };
    this.$http.httpCall().post(this.$api.goTo().create(), payload, {})
      .then(data => {debugger
        const res: any = data;
        if (res.status === 200) {
          localStorage.setItem("storeId", this.storeId);
          data = JSON.parse(res.data);
          payload.storeName = this.storeName;
          payload.cityId = this.selectedcity;
          payload.pinCodeLookupId = this.pinCodeLookupId;
          payload.proprietorName = this.proprietorName;
          payload.serviceId = payload.serviceId;
          // this._storageService.setVerification(payload);
          this.register();
          //alert("store created.")
          console.log("store created.")
        }
      }, err => {
        debugger
      })
      .catch(error => {
        console.log(error);
      });
  }

}
