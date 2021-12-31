import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRouting } from 'src/app/shared/api.routing';
import { HttpService } from 'src/services/httpCall/http.service';
import { StorageService } from 'src/services/storage/storage.service';
@Component({
  selector: 'app-view-registration-details',
  templateUrl: './view-registration-details.component.html',
  styleUrls: ['./view-registration-details.component.scss'],
})
export class ViewRegistrationDetailsComponent implements OnInit {
  
  constructor(
    private route: Router,
    private $http: HttpService,
    private $api: ApiRouting,
    private $storageService: StorageService) { }
 

  ngOnInit() {

  }

  register() {
    this.route.navigate(['./tabs']);
  }

}
