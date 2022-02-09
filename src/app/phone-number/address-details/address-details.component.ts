import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

import { ToastController } from '@ionic/angular';  
@Component({
  selector: 'app-address-details',
  templateUrl: './address-details.component.html',
  styleUrls: ['./address-details.component.scss'],
})
export class AddressDetailsComponent implements OnInit {
  storeId: ''
  mailingAddress: ""
  email: ""
  contactNumber: ""
  displayAddress: ""
  landmark: ""
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
    public toastCtrl: ToastController) { }
  ngOnInit() { }

  isEmail(search: string): boolean {
    var serchfind: boolean;
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    serchfind = regexp.test(search);
    console.log(serchfind)
    return serchfind
  }

  register() {
    this.route.navigate(['./phone-number/account-details']);
  }

  address() {
    let isOk = this.isEmail(this.email);
    if (!isOk) {
     this.openToast();
    }
    else {
      this.addresscall();
    }
  }
  async openToast() {  
    const toast = await this.toastCtrl.create({  
      message: 'Email is not valid',   
      duration: 4000  
    });  
    toast.present();  
  }  
  addresscall() {
    const payload = {
      "storeId": parseInt(localStorage.getItem("storeId")),
      "mailingAddress": this.mailingAddress,
      "email": this.email,
      "contactNumber": this.contactNumber,
      "displayAddress": this.displayAddress,
      "landmark": this.landmark
    };
    this.$http.httpCall().post(this.$api.goTo().address(), payload, {})
      .then(data => {
        debugger
        const res: any = data;
        if (res.status === 200) {
          alert("save data successfully")
          this.register();
          console.log("address added")
        }
      }, err => {
        debugger
      })
      .catch(error => {
        console.log(error);
      });
  }
}




