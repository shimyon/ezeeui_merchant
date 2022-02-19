import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ApiRouting } from 'src/app/shared/api.routing';
import { message } from 'src/app/utils';
import { HttpService } from 'src/services/httpCall/http.service';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { PincodeModalComponent } from '../pincode-modal/pincode-modal.component';
import { filter } from 'rxjs/operators';
import { ItemsPage } from 'src/app/items/items.page';
@Component({
  selector: 'app-registration-details',
  templateUrl: './registration-details.component.html',
  styleUrls: ['./registration-details.component.scss'],

})
export class RegistrationDetailsComponent implements OnInit {

  pincode1: ''
  getpincode:''
  services: ""
  storeId: ''
  storeName: ""
  cityId: 0
  pinCodeLookupId: 0
  proprietorName: ""
  serviceId: ""
  phoneNumber: string;
  states = []
  selectedState = null;
  selectedpincode = null;
  service1 = []
  selectedService = null;
  city = []
  selectedcity = null;
  pincode = []
  cityDisabled = true;
  pincodeDisabled = true;

  private _storageService: any;

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        'selectedService': this.service1,
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    this.service1 = [];
    this.services = '';
    if (data) {
      data.forEach(f => {
        this.service1.push(f.key);
        this.services += f.value + ' , ';
      })
    }

  }

  async showpincodeModal() {
    const pincodemodal = await this.modalCtrl.create({
      component: PincodeModalComponent,
      componentProps: {
        'selectedState': this.selectedState,
      }
    });
    pincodemodal.present();

    const { data } = await pincodemodal.onWillDismiss();
    this.pincode1 = null;
   
    if (data) {
      this.pincode1=data.key;
      this.getpincode=data.value;
    }
  }

  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
    public modalCtrl: ModalController) {
    console.log(this.pincode1);
  }

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
      "pinCodeLookupId": parseInt(this.pincode1),
      "proprietorName": this.proprietorName,
      "serviceId": this.service1.join()
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
