import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Firebase } from "@ionic-native/firebase";
import { Platform } from "@ionic/angular";
import { AngularFirestore } from "angularfire2/firestore";
@Injectable()
export class Fcm {
    firebaseNative: any;
    constructor(
        //public FirebaseNative: firebase,
        public afs: AngularFirestore,
        private platform: Platform
    ) { }
    async gettoken() {

        let token;
        if (this.platform.is('android')) {
            token = await this.firebaseNative.gettoken()
        }
        if (!this.platform.is('cordova')) {

        }
        return this.saveTokenToFirestore(token)
    }
    private saveTokenToFirestore(token) {
        if (!token) return;
        const devicesRef = this.afs.collection('devices')
        const docData = {
            token,
            userId: 'testUser'
        }
        return devicesRef.doc(token).set(docData)
    }
    listenTONotifications() {
        return this.firebaseNative.onNotificationOpen()
    }
}
