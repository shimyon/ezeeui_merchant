import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-document-details',
  templateUrl: './document-details.component.html',
  styleUrls: ['./document-details.component.scss'],
})
export class DocumentDetailsComponent implements OnInit {

  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }
  storeId: 0
  licenceNumber: string
  licenceUrl: string
  panCardNumber: string
  panCardUrl: string
  gstNumber: string
  gstUrl: string
  addharCardNumber: string
  addharCardUrl: string
  ownerPicUrl: string
  shopPicUrl: string
  logoUrl: string
  documenttype = []
  selecteddocument=null;
 
  getdropdown() {
    let url =this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
            const res: any = data;
              if (res.status === 200) {
                data = JSON.parse(res.data);
                data= data['response'];
                this.documenttype = data['documentType'];                 
              }
      },
        err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });

  }
  ngOnInit() {this.getdropdown() }

  register() {
    this.route.navigate(['./phone-number/view-registration']);
  }

  document() {
    const payload = {
      licenceNumber: this.licenceNumber,
      storeId: 0,
      licenceUrl: '',
      panCardNumber: '',
      panCardUrl: '',
      gstNumber: '',
      gstUrl: '',
      addharCardNumber: '',
      addharCardUrl: '',
      ownerPicUrl: '',
      shopPicUrl: '',
      logoUrl: '',
    };
    this.$http.httpCall().post(this.$api.goTo().documents(), payload, {})
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
