import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

import { TranslateLoader, TranslateModule, TranslatePipe } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, BaseAppConfig } from './app.config';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HTTP } from '@ionic-native/http/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ToastService } from './shared/toast/toast.service';
import { HttpService } from 'src/services/httpCall/http.service';
import { SharedModule } from './shared/shared.module';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
// import { Firebase } from '@ionic-native/firebase';
import { appInitialize } from '@ionic/angular/app-initialize';
import { Fcm } from 'src/Provider/fcm';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const Firebase = {
  apiKey: "AIzaSyBRH7bCR9Vr7c42TvRcLYEsAcTZB1LuKWw",
  authDomin: "",
  databaseURL: "",
  projectId: "notification-56229",
  StorageBucket: "notification-56229.appspot.com",
  messagingSenderId: "789271148392"
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    // AngularFireModule.initializeApp(Firebase),
    AngularFirestoreModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ToastService,
    HttpService,
    StatusBar,
    // NativeStorage,
    SplashScreen,
    HTTP,
    { provide: APP_CONFIG, useValue: BaseAppConfig },
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    //  Firebase,
    // Fcm
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
