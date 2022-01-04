import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AccountDetailsComponent implements OnInit {
  storeId: ''
  bankAccountNumber: ""
  bankName: ""
  bankIfscCode: ""
  accoungHolderName: ""
  bankDetailUrl: ""
  bankDetailUploadDate: ""
  accountType = []
  selectedaccount = null;
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() { }
  ionViewDidEnter() {
    this.getdropdown()
  }

  register() {
    this.route.navigate(['./phone-number/document-details']);
  }
  getdropdown() {
    let url = this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
        const res: any = data;
        if (res.status === 200) {
          data = JSON.parse(res.data);
          data = data['response'];
          this.accountType = data['bankAccountTypeCollection'];
        }
      },
        err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });

  }
 
  financial() {
    const payload = {
      "storeId": 0,
      "bankAccountNumber": this.bankAccountNumber,
      "bankName": this.bankName,
      "bankIfscCode": this.bankIfscCode,
      "accountType": this.selectedaccount,
      "accoungHolderName": this.accoungHolderName,
      "bankDetailUrl": this.bankDetailUrl,
      "bankDetailUploadDate": this.bankDetailUploadDate
    };
    this.$http.httpCall().post(this.$api.goTo().financial(), payload, {})
       .then(data => {
      const res: any = data;
      debugger
        if (res.status === 200) {
          debugger
          alert("save data successfully")
          this.register();
          console.log("bank account details added")
        }
      }, err => {
        debugger
        alert("not save data")
      })
      .catch(error => {
        console.log(error);
      });
   }
}