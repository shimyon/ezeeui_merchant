import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-pincode-modal',
  templateUrl: './pincode-modal.component.html',
  styleUrls: ['./pincode-modal.component.scss'],
})
export class PincodeModalComponent implements OnInit {
  pincode = []
  pincodeDisabled = true;
  cityDisabled= true;
  states = []

  @Input() selectedState: any;

  @Input() selectedpincode: any;

  constructor( public modalCtrl: ModalController,private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() {}
  dismiss() {
    this.modalCtrl.dismiss();
  }
  stateChange(): void {
    this.getcitypincode();
    this.cityDisabled = false;
    this.pincodeDisabled = false;
  }
  ionViewDidEnter() {
    this.getcitypincode()
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
}
