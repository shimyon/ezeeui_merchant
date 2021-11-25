import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import jwtDecode, * as jwt_decode from 'jwt-decode';
import { Platform } from '@ionic/angular';
import { ACTION_TYPE } from '../../app/utils/native-actions';
import { HttpClient } from '@angular/common/http';
import { ApiRouting } from '../../app/shared';
import { HttpService } from '../httpCall/http.service';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authSubject = new BehaviorSubject(null);
  userActionOnline = new BehaviorSubject(null);
  decodedToken: any;
  accessToken: string;
  refresh: string;
  userName: string;
  constructor(
    private plt: Platform,
    private $http: HttpClient,
    private $api: ApiRouting
  ) {

    this.plt.ready().then(() => {
      this.getToken();
    });
  }

  getToken() {
    let token = localStorage.getItem("token");
    if (typeof (token) === "string") {
      this.decodedToken = this.getDecodedAccessToken(token);
      this.accessToken = token;
      this.userName = this.decodedToken.UserName
      if (this.decodedToken.exp < new Date().getTime() / 1000) {
        this.authSubject.next(true);
      } else {
        this.authSubject.next(false);
      }
    } else {
      this.authSubject.next(false);
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }

  async getHeaderToken() {

    let token = localStorage.getItem(ACTION_TYPE.ACCESS_TOKEN);
    return token;
  }

  async getRefershtoken() {
    let refreshToken = localStorage.getItem(ACTION_TYPE.REFRESH_TOKEN_KEY);
    return refreshToken;
  }

  refreshToken() {
    //  let decodeData=this.getDecodedAccessToken(await this.getHeaderToken())
    //  let data= this.$native.getNative(ACTION_TYPE.REFRESH_TOKEN_KEY).then(refreshToken=>{
    //    return refreshToken;
    //   })
    let payload = {
      userName: this.userName,
      accessToken: this.getHeaderToken(),
      refreshToken: this.getRefershtoken()
    }

    return this.$http.post(this.$api.goTo().refreshTokenMerchant(), payload).pipe(tap((tokens: any) => {
      localStorage.setItem(ACTION_TYPE.REFRESH_TOKEN_KEY, tokens["refreshToken"]);
      localStorage.setItem(ACTION_TYPE.ACCESS_TOKEN, tokens["accessToken"])
    }));
  }

  // To Check LoggedIn state
  isLoggedIn() {
    return this.authSubject.asObservable();
  }

  // To checkUser Status
  /// check this service used user online and offline
  checkUserStatus(status) {
    let token = localStorage.getItem("token");
    if (token) {
      this.decodedToken = this.getDecodedAccessToken(token);
      if (this.decodedToken.exp < new Date().getTime() / 1000) {
        this.userActionOnline.next(null);
      } else {
        this.userActionOnline.next(status);
      }
    }
  }
}
