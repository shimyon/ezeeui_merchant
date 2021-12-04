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

  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/document-details']);
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
    debugger
    this.$http.httpCall().post(this.$api.goTo().financial(), payload, {})
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



