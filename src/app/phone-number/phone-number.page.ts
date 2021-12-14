import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Fcm } from 'src/Provider/fcm';
import { tap } from 'rxjs/operators';
import { present } from '@ionic/core/dist/types/utils/overlays';
@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.page.html',
  styleUrls: ['./phone-number.page.scss'],
})
export class PhoneNumberPage implements OnInit {

  constructor(private route: Router, public fcm: Fcm, public toastCtrl: ToastController) { }
  ionViewDidLoad() {
    this.fcm.gettoken()
    this.fcm.listenTONotifications().pipe(
      tap(async msg => {
        const toast = await this.toastCtrl.create({
          // message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
      .subscribe()
  }
  ngOnInit() {
  }
  register() {
    this.route.navigate(['./register']);
  }

}
