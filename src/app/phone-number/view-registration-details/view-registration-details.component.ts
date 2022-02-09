import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';
import { StorageService } from 'src/services/storage/storage.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-registration-details',
  templateUrl: './view-registration-details.component.html',
  styleUrls: ['./view-registration-details.component.scss'],
})
export class ViewRegistrationDetailsComponent implements OnInit {
  data: any=[];
 
  constructor(
    private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
    private $storageService: StorageService) {
      this.loadData();
     }
 

  ngOnInit() {

  }

  register() {
    this.route.navigate(['./tabs']);
  }
loadData(event=null){
  this.$http.httpCall()
  .post(this.$api.goTo().ListStore(),{},{})
  .then((resp:any)=>{
   
    this.data=resp.data;
  }); 
}
ListStore(){ 
  this.data=[];
  this.register();
}
  // ListStore() {
  //   const payload = {};
  //   this.$http.httpCall().post(this.$api.goTo().ListStore(), payload, {})
  //     .then(data => {
  //       debugger
  //       const res: any = data;
  //       if (res.status === 200) {
  //         alert("save data successfully")
  //         this.register();
  //       }

  //     }, err => {
  //       debugger
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }
  
}
