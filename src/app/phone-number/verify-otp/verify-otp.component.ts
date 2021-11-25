import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';
import { StorageService } from 'src/services/storage/storage.service';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit {

  countDown: string;
  isResend = false;
  verificationOTP: string;
  getverificationOtp: any;
  expirationTime: any;
  constructor(
    private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
    private $storageService: StorageService) { }

  ngOnInit() {
    debugger
    this.getverificationOtp = this.$storageService.getVerification();
    this.verificationOTP = this.getverificationOtp["otp"];
    this.expirationTime = this.getverificationOtp["otpExpirationTime"];
  }

  ionViewDidEnter() {
    this.intervalTimer();
  }


  resendOTP() {
    let payload = {
      phoneNumber: this.getverificationOtp['phoneNumber']
    }
    debugger
    this.$http.httpCall().post(this.$api.goTo().resndOtpMerchant(), payload, {}).then((res: any) => {
      let data = JSON.parse(res.data);
      console.log(data['response']);
      this.verificationOTP = data['response'].otp;
      this.expirationTime = data['response'].otpExpirationTime;
      this.$storageService.setVerification(data['response']);
      this.intervalTimer();
    })

  }

  register() {
    this.route.navigate(['./phone-number/registration']);
  }

  intervalTimer() {
    debugger
    let min = new Date(this.expirationTime).getMinutes()
    let timer = 60 * min;
    let minutes: any;
    let seconds: any
    var x = setInterval(() => {
      minutes = parseInt((timer / 60).toString(), 10);
      seconds = parseInt((timer % 60).toString(), 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      this.countDown = minutes + ":" + seconds;
      this.isResend = false;

      if (--timer < 0) {
        this.isResend = true;
        clearInterval(x);

      }
    }, 1000);
  }
}



