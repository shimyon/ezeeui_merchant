import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
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
  serviceCollection: any[];
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
  checkMaster() {
    setTimeout(() => {
      this.service1.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }
  isIndeterminate: boolean;
  masterCheck: boolean;
  checkEvent() {
    const totalItems = this.service1.length;
    let checked = 0;
    this.service1.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
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

  selectAll(_event) {
    console.log("in select all", _event);
    if (_event.detail.value.includes("selectall")) {
      this.service1 = this.serviceCollection;
    }
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

      "storeId": localStorage.getItem("storeId") ? parseInt(localStorage.getItem("storeId")) : 0,
      "storeName": this.storeName,
      "cityId": parseInt(this.selectedcity),
      "pinCodeLookupId": parseInt(this.selectedpincode),
      "proprietorName": this.proprietorName,
      "serviceId": this.selectedService.filter(f => f != '').toString()
    };
    this.$http.httpCall().post(this.$api.goTo().create(), payload, {})
      .then(data => {
        debugger
        const res: any = data;
        if (res.status === 200) {
          let data: any = JSON.parse(res.data);
          localStorage.setItem("storeId", data.add.storeId);
          localStorage.setItem("storeName", data.add.storeName);
          // payload.storeName = this.storeName;
          // payload.cityId = this.selectedcity;
          // payload.pinCodeLookupId = this.pinCodeLookupId;
          // payload.proprietorName = this.proprietorName;
          // payload.serviceId = payload.serviceId;
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
