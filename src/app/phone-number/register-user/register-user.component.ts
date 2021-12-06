import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';
import { StorageService } from 'src/services/storage/storage.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {

  phoneNumber = "";
  termsandcondition = false;

  constructor(
    private _storageService: StorageService,
    private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
  ) { }

  ngOnInit() {

  }

  register() {
    this.route.navigate(['./phone-number/otp']);

  }

  login() {
    const payload = {
      phoneNumber: this.phoneNumber,
      otp: "",
      otpExpirationTime: ''
    };
    debugger
    this.$http.httpCall().post(this.$api.goTo().merchantLogin(), payload, {})
      .then(data => {
        debugger
        const res: any = data;
        if (res.status === 200) {
          localStorage.setItem("phoneNumber", this.phoneNumber);
          data = JSON.parse(res.data);
          payload.otp = data['response'].otp;
          payload.otpExpirationTime = data['response'].otpExpirationTime;
          this._storageService.setVerification(payload);
          this.register();
          // }else{
          //   this.$nativeStorage.setNative(ACTION_TYPE.ACCESS_TOKEN, res.data).then(res=>{
          //     this.navCtrl.navigateRoot(['./tabs']);
          //     this.getSetAddress();
          //   },(error)=>{
          //     console.log(error)
          //   });


        }
      }, err => {
        debugger
      })
      .catch(error => {
        console.log(error);
      });
  }

}
