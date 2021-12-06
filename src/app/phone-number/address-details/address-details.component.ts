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
  constructor(private route: Router,
    private $http: HttpService,
    private $api: ApiRouting) { }

  ngOnInit() { }

  register() {
    this.route.navigate(['./phone-number/account-details']);
  }

}




