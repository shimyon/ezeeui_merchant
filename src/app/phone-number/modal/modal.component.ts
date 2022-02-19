import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {

  @Input() selectedService: any;

  service1 = []
  

  isIndeterminate: boolean;
  masterCheck: boolean;

  constructor(
    public modalCtrl: ModalController,
    private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() { }

  
  
  checkselectedservices() {

    this.service1.forEach((obj: any) => {
      if (this.selectedService.indexOf(obj.key) != -1) {
        obj.isChecked = true;
      }
    });

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
  
  okay() {
    let returnData = [];
    this.service1.forEach((obj: any) => {
      if (obj.isChecked) returnData.push(obj);
    });
    this.modalCtrl.dismiss(returnData);
  }

  checkMaster() {
    setTimeout(() => {
      this.service1.forEach(obj => {
        obj.isChecked = this.masterCheck;
      });
    });
  }

  checkEvent() {
    const totalItems = this.service1.length;
    let checked = 0;
    this.service1.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (checked == totalItems) {
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  ionViewDidEnter() {
    this.getdropdown()
  }

  getdropdown() {
    let url = this.$api.goTo().getdropdown();
    this.$http.httpCall().get(url, {}, {})
      .then(data => {
        const res: any = data;
        if (res.status === 200) {
          data = JSON.parse(res.data);
          data = data['response'];
          this.service1 = data['serviceCollection'];
          this.checkselectedservices();
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
