import { analyzeAndValidateNgModules } from '@angular/compiler';
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
  pincodeDisabled = true;
  states = []

  @Input() selectedState: any;
  @Input() selectedpincode: any;
  pincode = []
  pincodelist = []
  pincode1: ""

  constructor(public modalCtrl: ModalController, private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() { }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  onOpChange($event) {
    console.log($event);
    console.log($event.target.value);
  }

  okay() {
    const found = this.pincode.find(element => element.key == this.pincode1);
    this.modalCtrl.dismiss(found);
  }

  stateChange(): void {
    this.getcitypincode();
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

          this.pincodelist = this.pincode = data['pincodeCollection'];
        }
      },
        _err => {
          debugger
        })
      .catch(error => {
        console.log(error);
      });
  }

  searchpin(val) {
    this.pincode = this.pincodelist.filter(f => f.value.indexOf(val) != -1);
  }

}
