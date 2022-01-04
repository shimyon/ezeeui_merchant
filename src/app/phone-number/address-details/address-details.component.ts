import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

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
    private $api: ApiRouting) { }
    ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/account-details']);
  }
  address() {
    const payload = {
      "storeId": 0,
      "mailingAddress": this.mailingAddress,
      "email": this.email,
      "contactNumber":this.contactNumber,
      "displayAddress":this.displayAddress ,
      "landmark":this.landmark 
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




