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
  bankAccountNumber: string
  bankName: any
  bankIfscCode: string
  accountType: any
  accoungHolderName: string
  bankDetailUrl: any
  bankDetailUploadDate: any
  banktype = []
  selectedbank=null;
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }
           
  ngOnInit() {  this.getdropdown()}

  register() {
    this.route.navigate(['./phone-number/document-details']);
  }
  getdropdown() {
    let url =this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
            const res: any = data;
              if (res.status === 200) {
                data = JSON.parse(res.data);
                data= data['response'];
                this.banktype = data['bankAccountTypeCollection'];
              }
      },
        err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });

  }
  bankdetail() {
    const payload = {
      bankAccountNumber: this.bankAccountNumber,
      bankName: "",
      bankIfscCode: '',
      accountType: '',
      accoungHolderName: '',
      bankDetailUrl: '',
      bankDetailUploadDate: ''
    };
    this.$http.httpCall().post(this.$api.goTo().financial(), payload, {})
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



