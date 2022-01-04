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
  storeId: ''
  documentTypeId: ""
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
  ngOnInit() {}

  ionViewDidEnter() {
    this.getdropdown()
  }

  register() {
    this.route.navigate(['./phone-number/view-registration']);
  }

  document() {
    const payload = {
    "storeId": 0,
    "documentTypeId": this.selecteddocument
    };
    this.$http.httpCall().post(this.$api.goTo().document(), payload, {})
      .then(data => {
        debugger
        const res: any = data;
          if (res.status === 200) {
            alert("save data successfully")
            //this._storageService.setVerification(payload);
            this.register();
          }
        }, err => {
          debugger
        })
        .catch(error => {
          console.log(error);
        });
      }
  }